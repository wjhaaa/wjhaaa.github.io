import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createDataSourceFetcher } from "@/services/data-source";
import type {
  DashboardDataSource,
  DataSourceConfig,
} from "@/types/ai-dashboard";

type Props = {
  dataSource: DataSourceConfig | undefined;
  onDataSourceChange: (config: DataSourceConfig) => void;
  onDataFetched: (data: DashboardDataSource) => void;
};

export function DataSourcePanel({
  dataSource,
  onDataSourceChange,
  onDataFetched,
}: Props) {
  const [urlInput, setUrlInput] = useState(
    dataSource?.type === "url" ? dataSource.url : "",
  );
  const [intervalInput, setIntervalInput] = useState(
    dataSource?.type === "url"
      ? String(dataSource.refreshIntervalMs ?? 30000)
      : "30000",
  );
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const fetcherRef = useRef(createDataSourceFetcher());

  useEffect(() => {
    return () => fetcherRef.current.stop();
  }, []);

  const isUrlMode = dataSource?.type === "url";

  function handleEnableUrl() {
    const url = urlInput.trim() || "https://httpbin.org/json";
    const interval = Math.max(5000, Number(intervalInput) || 30000);
    const config: DataSourceConfig = {
      type: "url",
      url,
      refreshIntervalMs: interval,
    };
    onDataSourceChange(config);
  }

  function handleDisableUrl() {
    fetcherRef.current.stop();
    onDataSourceChange({ type: "mock" });
    setFetchStatus("idle");
    setErrorMsg("");
  }

  function handleFetchOnce() {
    if (!isUrlMode) return;
    setFetchStatus("loading");
    setErrorMsg("");

    fetcherRef.current
      .fetchOnce(dataSource)
      .then((data) => {
        onDataFetched(data);
        setFetchStatus("success");
        setTimeout(() => setFetchStatus("idle"), 1500);
      })
      .catch((err) => {
        setFetchStatus("error");
        setErrorMsg(err.message);
      });
  }

  function handleStartPolling() {
    if (!isUrlMode) return;
    setFetchStatus("loading");
    setErrorMsg("");

    fetcherRef.current.startPolling(
      dataSource,
      (data) => {
        onDataFetched(data);
        setFetchStatus("success");
      },
      (err) => {
        setFetchStatus("error");
        setErrorMsg(err.message);
      },
    );
  }

  function handleStopPolling() {
    fetcherRef.current.stop();
    setFetchStatus("idle");
  }

  return (
    <Card>
      <CardHeader className="space-y-2">
        <p className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
          数据源配置
        </p>
        <h2 className="text-lg font-semibold">Data Source</h2>
        <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
          默认使用内置 Mock 数据。可切换为 URL 端点以接入真实 API。
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode toggle */}
        <div className="flex gap-2">
          <Button
            variant={!isUrlMode ? "default" : "outline"}
            size="sm"
            onClick={handleDisableUrl}
          >
            Mock 数据
          </Button>
          <Button
            variant={isUrlMode ? "default" : "outline"}
            size="sm"
            disabled={isUrlMode}
            onClick={handleEnableUrl}
          >
            URL 端点
          </Button>
        </div>

        {/* URL config */}
        {isUrlMode && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
                API URL
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  onDataSourceChange({
                    ...dataSource,
                    url: e.target.value,
                  } as DataSourceConfig & { type: "url" });
                }}
                placeholder="https://api.example.com/dashboard-data"
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-3 py-2 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
                刷新间隔 (ms)
              </label>
              <input
                type="number"
                value={intervalInput}
                min={5000}
                step={1000}
                onChange={(e) => {
                  setIntervalInput(e.target.value);
                  const ms = Math.max(5000, Number(e.target.value) || 30000);
                  onDataSourceChange({
                    ...dataSource,
                    refreshIntervalMs: ms,
                  } as DataSourceConfig & { type: "url" });
                }}
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-3 py-2 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleFetchOnce}
                disabled={fetchStatus === "loading"}
              >
                {fetchStatus === "loading" ? "请求中..." : "手动刷新一次"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleStartPolling}
                disabled={fetchStatus === "loading"}
              >
                开始轮询
              </Button>
              <Button size="sm" variant="ghost" onClick={handleStopPolling}>
                停止
              </Button>
            </div>
            {fetchStatus === "success" && (
              <div className="rounded-lg bg-emerald-950/30 px-3 py-2 text-xs text-emerald-400">
                数据获取成功
              </div>
            )}
            {fetchStatus === "error" && (
              <div className="rounded-lg bg-red-950/30 px-3 py-2 text-xs text-red-400">
                {errorMsg}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
