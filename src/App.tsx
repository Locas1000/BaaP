import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRanchContextStore } from "./store/useRanchContextStore";

const queryClient = new QueryClient();

export function App() {
  const { activeRanchId, setActiveRanchId } = useRanchContextStore();

  const handleRanchChange = (ranchId: string) => {
    setActiveRanchId(ranchId || null);
    queryClient.invalidateQueries();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <h1>BaaPP (OviApp) — Portal de Asociación y Rancho</h1>
        <label>
          Rancho Activo:{" "}
          <select value={activeRanchId ?? ""} onChange={(e) => handleRanchChange(e.target.value)}>
            <option value="">Seleccionar rancho...</option>
            <option value="los-sauces">Rancho Los Sauces</option>
            <option value="la-curva">Rancho La Curva</option>
          </select>
        </label>
      </header>
      <main style={{ padding: "1rem" }}>
        <p>Contexto activo (X-Active-Ranch-Id): {activeRanchId ?? "Ninguno"}</p>
      </main>
    </QueryClientProvider>
  );
}
