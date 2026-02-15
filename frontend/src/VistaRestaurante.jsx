import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VistaRestaurante.css";

function VistaRestaurante() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    ingresos: [],
    best5Platos: [],
    worst5Platos: [],
    unidadesVendidas: [],
    bestRentablePlato: [],
    worstRentablePlato: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const currency = (v) => {
  const n = parseFloat(v) || 0;
  return n.toLocaleString("es-PE", { 
    style: "currency", 
    currency: "PEN", 
    minimumFractionDigits: 2 
  });
};


  // Normaliza filas (por si las columnas vienen con mayúsculas desde SQL)
  const norm = (row) => {
    if (!row) return {};
    return {
      id: row.id ?? row.ID ?? row.plato_id ?? row.PLATO_ID,
      nombre: row.nombre ?? row.NOMBRE,
      descripcion: row.descripcion ?? row.DESCRIPCION,
      precio: row.precio ?? row.PRECIO,
      calificacion: row.calificacion ?? row.CALIFICACION,
      total_vendido: row.total_vendido ?? row.TOTAL_VENDIDO ?? row.total ?? row.TOTAL,
      ingresos_generados: row.ingresos_generados ?? row.ingresos_generados ?? row.INGRESOS_GENERADOS ?? row.ingresos_totales ?? row.INGRESOS_TOTALES,
      restaurante: row.restaurante ?? row.RESTAURANTE ?? row.nombre_restaurante ?? row.restaurante,
      unidades_vendidas: row.unidades_vendidas ?? row.UNIDADES_VENDIDAS,
    };
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/restaurantes/${id}/infoRestaurante`, { signal: controller.signal });
        if (!res.ok) throw new Error("Error al cargar datos del restaurante");
        const json = await res.json();

        // Aseguramos estructuras por defecto
        setData({
          ingresos: Array.isArray(json.ingresos) ? json.ingresos : (json.ingresos ? [json.ingresos] : []),
          best5Platos: Array.isArray(json.best5Platos) ? json.best5Platos : (json.best5Platos ? [json.best5Platos] : []),
          worst5Platos: Array.isArray(json.worst5Platos) ? json.worst5Platos : (json.worst5Platos ? [json.worst5Platos] : []),
          unidadesVendidas: Array.isArray(json.unidadesVendidas) ? json.unidadesVendidas : (json.unidadesVendidas ? [json.unidadesVendidas] : []),
          bestRentablePlato: Array.isArray(json.bestRentablePlato) ? json.bestRentablePlato : (json.bestRentablePlato ? [json.bestRentablePlato] : []),
          worstRentablePlato: Array.isArray(json.worstRentablePlato) ? json.worstRentablePlato : (json.worstRentablePlato ? [json.worstRentablePlato] : []),
        });
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message || "Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [id]);

  if (loading) return <div className="vr-loading">Cargando información del restaurante...</div>;
  if (error) return <div className="vr-error">Error: {error}</div>;

  // Extraer métricas principales
  const ingresosRow = data.ingresos.find((r) => {
    const normR = norm(r);
    return String(normR.restaurante_id ?? normR.id ?? "").trim() === String(id).trim();
  }) ?? data.ingresos[0];

  const ingresosTotales = norm(ingresosRow).ingresos_totales ?? norm(ingresosRow).ingresos_generados ?? 0;
  const unidadesVendidasVal = (data.unidadesVendidas[0] && (norm(data.unidadesVendidas[0]).unidades_vendidas ?? Object.values(data.unidadesVendidas[0])[0])) || 0;

  const bestRent = norm((data.bestRentablePlato && data.bestRentablePlato[0]) || {});
  const worstRent = norm((data.worstRentablePlato && data.worstRentablePlato[0]) || {});

  // Top arrays normalizados
  const topPlates = data.best5Platos.map(norm);
  const worstPlates = data.worst5Platos.map(norm);

  return (
    <div className="vr-page">
      <aside className="vr-sidebar">
        <div className="vr-brand">
          <div className="vr-logo">🍴</div>
          <div>
            <h3>FoodDash</h3>
            <small>Panel Admin</small>
          </div>
        </div>

        <div className="vr-restaurant">
          <h4>{(ingresosRow && (norm(ingresosRow).restaurante || norm(ingresosRow).nombre)) || `Restaurante ${id}`}</h4>
          <small>ID {id} — Panel</small>
        </div>

        <nav className="vr-nav">
          <button className="active">Dashboard</button>
          <button onClick={() => navigate(`/restaurante/${id}/platos`)}>Platos</button>
          <button onClick={() => navigate(`/restaurante/${id}/pedidos`)}>Pedidos</button>
          <button onClick={() => navigate("/")}>Vista Estudiante</button>
        </nav>
      </aside>

      <main className="vr-content">
        <header className="vr-header">
          <h1>Dashboard</h1>
          <p className="vr-sub">Resumen de rendimiento del restaurante</p>
        </header>

        <section className="vr-cards">
          <div className="vr-card">
            <div className="vr-card-title">Ingresos Totales</div>
            <div className="vr-card-value">{currency(ingresosTotales)}</div>
          </div>

          <div className="vr-card">
            <div className="vr-card-title">Unidades Vendidas</div>
            <div className="vr-card-value">{Number(unidadesVendidasVal) || 0}</div>
          </div>

          <div className="vr-card">
            <div className="vr-card-title">Plato más rentable</div>
            <div className="vr-card-value small">
              <div className="vr-card-name">{bestRent.nombre ?? "—"}</div>
              <div className="vr-card-sub">{currency(bestRent.ingresos_generados ?? 0)}</div>
            </div>
          </div>

          <div className="vr-card">
            <div className="vr-card-title">Plato menos rentable</div>
            <div className="vr-card-value small">
              <div className="vr-card-name">{worstRent.nombre ?? "—"}</div>
              <div className="vr-card-sub">{currency(worstRent.ingresos_generados ?? 0)}</div>
            </div>
          </div>
        </section>

        <section className="vr-chart-and-lists">
          <div className="vr-chart-card">
            <h3>Ventas por Plato (Top 5)</h3>
            <p className="muted">Cantidad de unidades vendidas por plato</p>

            <div className="vr-chart">
              {/* Generamos un gráfico de barras simple con CSS */}
              {topPlates.length === 0 ? (
                <div className="muted">No hay datos de ventas</div>
              ) : (
                <div className="vr-bars">
                  {topPlates.slice(0, 5).map((p, i) => {
                    const value = Number(p.total_vendido) || Number(p.TOTAL_VENDIDO) || 0;
                    // Para escala, buscamos el máximo
                    return (
                      <div className="vr-bar-item" key={i}>
                        <div className="vr-bar" style={{ height: `${Math.max(6, Math.min(220, (value / (topPlates[0] && (Number(topPlates[0].total_vendido) || 1))) * 220))}px` }} title={`${value} vendidos`}>
                          <span className="vr-bar-label">{value}</span>
                        </div>
                        <div className="vr-bar-name">{p.nombre}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <aside className="vr-side-lists">
            <div className="vr-list-card">
              <h4>🏆 Más Vendidos</h4>
              <div className="vr-list">
                {topPlates.slice(0, 3).map((p, i) => (
                  <div className="vr-list-item" key={i}>
                    <div className="left">
                      <div className="rank">{i + 1}</div>
                      <div className="info">
                        <div className="name">{p.nombre}</div>
                        <div className="meta">⭐ {p.calificacion ?? "—"} · {p.total_vendido ?? 0} vendidos</div>
                      </div>
                    </div>
                    <div className="price">{currency(p.precio)}</div>
                  </div>
                ))}
                {topPlates.length === 0 && <div className="muted">Sin datos</div>}
              </div>
            </div>

            <div className="vr-list-card">
              <h4>📉 Menos Vendidos</h4>
              <div className="vr-list">
                {worstPlates.slice(0, 3).map((p, i) => (
                  <div className="vr-list-item" key={i}>
                    <div className="left">
                      <div className="rank">{i + 1}</div>
                      <div className="info">
                        <div className="name">{p.nombre}</div>
                        <div className="meta">⭐ {p.calificacion ?? "—"} · {p.total_vendido ?? 0} vendidos</div>
                      </div>
                    </div>
                    <div className="price">{currency(p.precio)}</div>
                  </div>
                ))}
                {worstPlates.length === 0 && <div className="muted">Sin datos</div>}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default VistaRestaurante;
