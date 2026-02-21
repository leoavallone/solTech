import { useEffect, useState } from "react";
import { cloudOcpp } from "./services/api";
import { useAuth } from "./context/AuthContext";

interface ChargePoint {
  label?: string;
  tipo?: string;
  cliente?: string;
  bootNotification?: {
    chargePointVendor?: string;
    chargePointModel?: string;
    chargePointSerialNumber?: string;
  };
  statusNotification?: {
    status?: string;
  };
  data?: string;
}

const Dashboard2BTech = () => {
  const { user } = useAuth();
  const token = user.access_ocpp_token;
  const [chargePoints, setChargePoints] = useState<ChargePoint[]>([]);
  const [load, setLoad] = useState(false);

  // Dados de exemplo para os gráficos
  const revenueData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    revenue: [65000, 59000, 80000, 81000, 95000, 105000, 110000, 95000, 90000, 70000, 85000, 95000],
    cost: [35000, 42000, 45000, 52000, 48000, 55000, 82000, 62000, 45000, 42000, 48000, 40000]
  };

  const doughnutData = {
    labels: ['Ads', 'Subscriptions', 'Sponsorships'],
    values: [45, 35, 20],
    colors: ['#4CAF50', '#2196F3', '#F44336']
  };


  async function fetchChargePoints() {
    
    try {
      const response = await cloudOcpp.get(`/CentralSystem/ChargePointList`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data && response.data.ChargePointList.length > 0) {
        setChargePoints(response.data.ChargePointList);
      }
    } catch (error) {
      setLoad(false);
      console.error("Erro ao buscar charge points:", error);
    }
  }

  async function fetchTransactionData() {
    try {
      const response = await cloudOcpp.post(`/CentralSystem/ChargePointList`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data && response.data.ChargePointList.length > 0) {
        setChargePoints(response.data.ChargePointList);
      }
    } catch (error) {
      setLoad(false);
      console.error("Erro ao buscar charge points:", error);
    }
  }

  useEffect(() => {
    setLoad(true);
    fetchChargePoints();
    fetchTransactionData();
    setLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const StatsCard = ({ title, value, change, icon }: { title: string; value: string; change: number; icon: string }) => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      flex: 1
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{title}</p>
          <h2 style={{ margin: '10px 0', fontSize: '28px', color: '#1a1a1a' }}>{value}</h2>
          <p style={{ margin: 0, color: change >= 0 ? '#4CAF50' : '#F44336', fontSize: '13px' }}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vs último mês
          </p>
        </div>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const DoughnutChart = () => {
    const total = doughnutData.values.reduce((a, b) => a + b, 0);
    let currentAngle = -90;

    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1a1a1a' }}>Origem das Receitas</h3>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            {doughnutData.values.map((value, index) => {
              const percentage = value / total;
              const angle = percentage * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              currentAngle = endAngle;

              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const outerRadius = 90;
              const innerRadius = 50;

              const x1 = 100 + outerRadius * Math.cos(startRad);
              const y1 = 100 + outerRadius * Math.sin(startRad);
              const x2 = 100 + outerRadius * Math.cos(endRad);
              const y2 = 100 + outerRadius * Math.sin(endRad);
              const x3 = 100 + innerRadius * Math.cos(endRad);
              const y3 = 100 + innerRadius * Math.sin(endRad);
              const x4 = 100 + innerRadius * Math.cos(startRad);
              const y4 = 100 + innerRadius * Math.sin(startRad);

              const largeArc = angle > 180 ? 1 : 0;

              return (
                <path
                  key={index}
                  d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`}
                  fill={doughnutData.colors[index]}
                />
              );
            })}
          </svg>
          <div>
            {doughnutData.labels.map((label, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '15px', height: '15px', background: doughnutData.colors[index], borderRadius: '3px' }} />
                <span style={{ fontSize: '14px', color: '#666' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const LineChart = () => {
    const svgWidth = 800;
    const svgHeight = 250;
    const padding = 10;
    
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1a1a1a' }}>Receitas Ativas</h3>
        <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
          <svg width="100%" height="250" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1={padding}
                y1={i * 50 + padding}
                x2={svgWidth - padding}
                y2={i * 50 + padding}
                stroke="#f0f0f0"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            
            {/* Revenue line */}
            <polyline
              points={revenueData.revenue.map((val, idx) => {
                const x = padding + (idx / 11) * (svgWidth - 2 * padding);
                const y = svgHeight - padding - (val / 120000) * (svgHeight - 2 * padding);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#4CAF50"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Cost line */}
            <polyline
              points={revenueData.cost.map((val, idx) => {
                const x = padding + (idx / 11) * (svgWidth - 2 * padding);
                const y = svgHeight - padding - (val / 120000) * (svgHeight - 2 * padding);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#F44336"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '12px', color: '#999' }}>
            {revenueData.labels.map((label, idx) => (
              <span key={idx}>{label}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '15px', height: '3px', background: '#4CAF50' }} />
              <span style={{ fontSize: '13px', color: '#666' }}>Revenue</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '15px', height: '3px', background: '#F44336' }} />
              <span style={{ fontSize: '13px', color: '#666' }}>Cost</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DataTable = () => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginTop: '20px'
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
              {['Estação', 'Tipo', 'Cliente', 'Fornecedor', 'Modelo', 'Serial', 'Online', 'Data', 'Status'].map((header) => (
                <th key={header} style={{
                  padding: '15px 10px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#666',
                  textTransform: 'uppercase'
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chargePoints.map((row, index) => {
              const status = row.statusNotification?.status ?? 'Unknown';
              const isAvailable = status === 'Available';
              return (
                <tr key={index} style={{
                  borderBottom: '1px solid #f5f5f5',
                  transition: 'background 0.2s ease'
                }}>
                  <td style={{ padding: '15px 10px', fontSize: '14px', color: '#1a1a1a', fontWeight: '500' }}>{row.label}</td>
                  <td style={{ padding: '15px 10px', fontSize: '14px', color: '#666' }}>{row.tipo ?? 'PADRAO'}</td>
                  <td style={{ padding: '15px 10px', fontSize: '14px', color: '#666' }}>{row.cliente ?? 'INTERNO'}</td>
                  <td style={{ padding: '15px 10px', fontSize: '14px', color: '#666' }}>{row.bootNotification?.chargePointVendor ?? 'N/A'}</td>
                  <td style={{ padding: '15px 10px', fontSize: '14px', color: '#666' }}>{row.bootNotification?.chargePointModel ?? 'N/A'}</td>
                  <td style={{ padding: '15px 10px', fontSize: '14px', color: '#666' }}>{row.bootNotification?.chargePointSerialNumber ?? 'Indisponível'}</td>
                  <td style={{ padding: '15px 10px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      background: isAvailable ? '#e8f5e9' : '#ffebee',
                      color: isAvailable ? '#2e7d32' : '#c62828'
                    }}>
                      {isAvailable ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td style={{ padding: '15px 10px', fontSize: '14px', color: '#666' }}>{row.data ?? 'N/A'}</td>
                  <td style={{ padding: '15px 10px', fontSize: '14px', color: '#666' }}>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        fontSize: '14px',
        color: '#666'
      }}>
        <span>Anterior</span>
        <span>Página 1 de 4</span>
        <span style={{ color: '#4CAF50', cursor: 'pointer' }}>Próxima</span>
      </div>
    </div>
  );

  return (
    <>
      {load ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            fontSize: '18px',
            color: '#666'
          }}>
            Carregando dados...
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <StatsCard title="Total Estações" value="248" change={12.5} icon="⚡" />
              <StatsCard title="Estações Ativas" value="186" change={8.2} icon="✓" />
              <StatsCard title="Receita Mensal" value="R$ 95k" change={15.3} icon="💰" />
              <StatsCard title="Transações Hoje" value="1.2k" change={-2.4} icon="📊" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
              <DoughnutChart />
              <LineChart />
            </div>

            <DataTable />
          </>
        )}
    </>
  );
};

export default Dashboard2BTech;