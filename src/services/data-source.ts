import type { DashboardDataSource, DataSourceConfig } from "@/types/ai-dashboard";

export async function fetchDataSource(
  config: DataSourceConfig,
): Promise<DashboardDataSource> {
  if (config.type === "mock") {
    throw new Error("Use mock data directly, don't fetch for mock type");
  }

  const response = await fetch(config.url);
  if (!response.ok) {
    throw new Error(`Data fetch failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<DashboardDataSource>;
}

export function createDataSourceFetcher() {
  let controller: AbortController | null = null;
  let timer: ReturnType<typeof setInterval> | null = null;

  function stop() {
    if (controller) {
      controller.abort();
      controller = null;
    }
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  async function fetchOnce(
    config: DataSourceConfig & { type: "url" },
  ): Promise<DashboardDataSource> {
    stop();
    controller = new AbortController();

    const response = await fetch(config.url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Data fetch failed: ${response.status} ${response.statusText}`,
      );
    }

    return response.json() as Promise<DashboardDataSource>;
  }

  function startPolling(
    config: DataSourceConfig & { type: "url" },
    onData: (data: DashboardDataSource) => void,
    onError: (err: Error) => void,
  ) {
    stop();

    const interval = config.refreshIntervalMs ?? 30000;

    const tick = async () => {
      try {
        controller = new AbortController();
        const response = await fetch(config.url, {
          signal: controller.signal,
        });
        if (response.ok) {
          const json = (await response.json()) as DashboardDataSource;
          onData(json);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    // Initial fetch
    tick();
    timer = setInterval(tick, interval);
  }

  return { fetchOnce, startPolling, stop };
}
