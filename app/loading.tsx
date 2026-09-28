export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#050816",
        color: "#38bdf8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          border: "6px solid #1e293b",
          borderTop: "6px solid #38bdf8",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <h1 style={{ marginTop: "30px", fontSize: "32px" }}>
        Initializing AI Portfolio...
      </h1>

      <p style={{ marginTop: "10px", color: "#94a3b8" }}>
        Please wait...
      </p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}