export function BrowserFrame({
  url,
  width,
  children,
}: {
  url: string;
  width?: number;
  children: React.ReactNode;
}) {
  const frameWidth = width ? `${width}px` : "100%";

  return (
    <div
      className="inline-block max-w-full align-top self-start"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "14px",
        overflow: "hidden",
        width: frameWidth,
      }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[6px] h-[6px] rounded-full"
            style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
          />
        ))}
        <span
          className="text-[#A1A1A6] ml-4 truncate"
          style={{ fontSize: "10px", fontFamily: "monospace" }}
        >
          {url}
        </span>
      </div>
      <div className="p-6 flex items-center justify-center min-h-0" style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
