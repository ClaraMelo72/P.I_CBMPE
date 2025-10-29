import { useMemo, useState } from "react";
import {
  ContainerPainel,
  PageTopHeaderRow,
  PageTitle,
  PageSubtitle,
  BoxInfo,
  SectionTitle,
  ActionsRow,
  ResponsiveRow,
  GridColumn,
  MiniGrid,
  DashboardAlert,
  AlertContent,
  AlertIndicator,
  AlertText,
  MetricCard,
  MetricTrend,
  ChartHeader,
  GraficoBarrasContainer,
  EixoYBarras,
  ValorEixoYBarras,
  BarrasContainer,
  BarChartColumn,
  Bar,
  BarLabel,
  PieChartContainer,
  LegendItem,
  LegendColor,
  LegendText,
  LegendValue,
  StatItem,
  GraficoRegiaoContainer,
  EixoY,
  ValorEixoY,
  BarraRegiaoContainer,
  BarraRegiao,
  ValorBarra,
  NomeRegiao,
  StatsGrid
} from "./dashboardOperacional.styles";

const ocorrencias = [
  {
    id: "#OCR-2025-001",
    data: "20/10/2025",
    hora: "08:30",
    tipo: "Incêndio",
    localizacao: "Recife - Boa Viagem",
    viatura: "ABT-01",
    status: "Em andamento",
    responsavel: "Sgt. Carlos Silva",
  },
  {
    id: "#OCR-2025-002",
    data: "19/10/2025",
    hora: "14:15",
    tipo: "Resgate",
    localizacao: "Olinda - Bairro Novo",
    viatura: "USB-02",
    status: "Concluído",
    responsavel: "Cb. Ana Costa",
  },
  {
    id: "#OCR-2025-003",
    data: "18/10/2025",
    hora: "10:45",
    tipo: "APH",
    localizacao: "Jaboatão - Prazeres",
    viatura: "USA-03",
    status: "Pendente",
    responsavel: "Sd. Pedro Lima",
  },
  {
    id: "#OCR-2025-004",
    data: "21/10/2025",
    hora: "16:10",
    tipo: "Incêndio",
    localizacao: "Recife - Boa Vista",
    viatura: "ABT-04",
    status: "Concluído",
    responsavel: "Sgt. Maria Oliveira",
  },
  {
    id: "#OCR-2025-005",
    data: "22/10/2025",
    hora: "09:20",
    tipo: "Resgate",
    localizacao: "Olinda - Varadouro",
    viatura: "USB-05",
    status: "Em andamento",
    responsavel: "Cb. João Santos",
  },
  {
    id: "#OCR-2025-006",
    data: "23/10/2025",
    hora: "07:50",
    tipo: "APH",
    localizacao: "Recife - Pina",
    viatura: "USA-03",
    status: "Pendente",
    responsavel: "Sgt. Carlos Silva",
  },
  {
    id: "#OCR-2025-007",
    data: "24/10/2025",
    hora: "13:25",
    tipo: "Incêndio",
    localizacao: "Jaboatão - Curado",
    viatura: "ABT-01",
    status: "Concluído",
    responsavel: "Cb. Ana Costa",
  },
  {
    id: "#OCR-2025-008",
    data: "24/10/2025",
    hora: "11:00",
    tipo: "Resgate",
    localizacao: "Recife - Casa Forte",
    viatura: "USB-02",
    status: "Em andamento",
    responsavel: "Sd. Pedro Lima",
  },
];

export function DashboardOperacional() {
  const [filtroPeriodo, setFiltroPeriodo] = useState("semana");

 
  const dadosGraficoPeriodo = useMemo(() => {
    const hoje = new Date("2025-10-24"); 
    let dataInicio: Date;
    let dataFim: Date;

    switch (filtroPeriodo) {
      case "dia":
        dataInicio = new Date(hoje);
        dataFim = new Date(hoje);
        break;
      case "semana":
        dataInicio = new Date(hoje);
        dataInicio.setDate(hoje.getDate() - 7);
        dataFim = new Date(hoje);
        break;
      case "mes":
        dataInicio = new Date(hoje);
        dataInicio.setMonth(hoje.getMonth() - 1);
        dataFim = new Date(hoje);
        break;
      default:
        dataInicio = new Date(hoje);
        dataInicio.setDate(hoje.getDate() - 7);
        dataFim = new Date(hoje);
    }

   
    const ocorrenciasFiltradas = ocorrencias.filter(ocorrencia => {
      const dataOcorrencia = new Date(
        ocorrencia.data.split('/').reverse().join('-')
      );
      return dataOcorrencia >= dataInicio && dataOcorrencia <= dataFim;
    });

    
    const ocorrenciasPorData = ocorrenciasFiltradas.reduce((acc, ocorrencia) => {
      acc[ocorrencia.data] = (acc[ocorrencia.data] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

   
    const dadosFormatados = Object.entries(ocorrenciasPorData)
      .sort(([dataA], [dataB]) => new Date(dataA.split('/').reverse().join('-')).getTime() - new Date(dataB.split('/').reverse().join('-')).getTime())
      .map(([data, quantidade]) => ({
        data: data.split('/').slice(0, 2).join('/'), 
        ocorrencias: quantidade
      }));

    return dadosFormatados;
  }, [filtroPeriodo]);

  // Estatísticas calculadas das ocorrências 
  const estatisticas = useMemo(() => {
    const hoje = new Date("2025-10-24");
    let dataInicio: Date;
    let dataFim: Date;

    switch (filtroPeriodo) {
      case "dia":
        // Último dia (apenas 24/10)
        dataInicio = new Date(hoje);
        dataFim = new Date(hoje);
        break;
      case "semana":
        // Última semana (18/10 a 24/10)
        dataInicio = new Date(hoje);
        dataInicio.setDate(hoje.getDate() - 7);
        dataFim = new Date(hoje);
        break;
      case "mes":
        // Último mês (setembro/outubro)
        dataInicio = new Date(hoje);
        dataInicio.setMonth(hoje.getMonth() - 1);
        dataFim = new Date(hoje);
        break;
      default:
        dataInicio = new Date(hoje);
        dataInicio.setDate(hoje.getDate() - 7);
        dataFim = new Date(hoje);
    }

    // Filtrar ocorrências pelo período selecionado
    const ocorrenciasFiltradas = ocorrencias.filter(ocorrencia => {
      const dataOcorrencia = new Date(
        ocorrencia.data.split('/').reverse().join('-')
      );
      return dataOcorrencia >= dataInicio && dataOcorrencia <= dataFim;
    });

    const totalOcorrencias = ocorrenciasFiltradas.length;
    const criticas = ocorrenciasFiltradas.filter(o => o.status === "Pendente").length;
    const emAndamento = ocorrenciasFiltradas.filter(o => o.status === "Em andamento").length;
    const concluidas = ocorrenciasFiltradas.filter(o => o.status === "Concluído").length;
    
    // Viaturas únicas
    const viaturasUnicas = [...new Set(ocorrenciasFiltradas.map(o => o.viatura))].length;
    
    // Tipos de ocorrência com contagem
    const tiposOcorrencia = ocorrenciasFiltradas.reduce((acc, o) => {
      acc[o.tipo] = (acc[o.tipo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Encontrar o tipo mais comum
    const tipoMaisComum = Object.entries(tiposOcorrencia)
      .sort(([,a], [,b]) => b - a)[0];

    // Ocorrências por região
    const ocorrenciasPorRegiao = ocorrenciasFiltradas.reduce((acc, o) => {
      const regiao = o.localizacao.split(" - ")[0];
      acc[regiao] = (acc[regiao] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalOcorrencias,
      criticas,
      emAndamento,
      concluidas,
      viaturas: viaturasUnicas,
      equipesAtivas: 8, 
      tiposOcorrencia,
      tipoMaisComum: tipoMaisComum ? { tipo: tipoMaisComum[0], quantidade: tipoMaisComum[1] } : null,
      ocorrenciasPorRegiao
    };
  }, [filtroPeriodo]);

  // Componente de gráfico de barras simples
  const GraficoBarras = ({ dados, alturaMaxima = 60 }: { dados: { data: string; ocorrencias: number }[]; alturaMaxima?: number }) => {
    if (dados.length === 0) {
      return (
        <div style={{ 
          height: '60px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#6B7280',
          fontSize: '14px'
        }}>
          Nenhuma ocorrência no período selecionado
        </div>
      );
    }

    const maxOcorrencias = Math.max(...dados.map(d => d.ocorrencias));
    
    return (
      <GraficoBarrasContainer>
        <EixoYBarras>
          {[Math.ceil(maxOcorrencias), Math.ceil(maxOcorrencias * 0.75), Math.ceil(maxOcorrencias * 0.5), Math.ceil(maxOcorrencias * 0.25), 0]
            .filter((valor, index, array) => array.indexOf(valor) === index)
            .map(valor => (
              <ValorEixoYBarras key={valor}>
                {valor}
              </ValorEixoYBarras>
            ))}
        </EixoYBarras>
        <BarrasContainer>
          {dados.map((item, index) => (
            <BarChartColumn key={index}>
              <Bar height={(item.ocorrencias / maxOcorrencias) * alturaMaxima} />
              <BarLabel>{item.data}</BarLabel>
            </BarChartColumn>
          ))}
        </BarrasContainer>
      </GraficoBarrasContainer>
    );
  };

  // Componente de gráfico de pizza/donut simples
  const GraficoPizza = ({ dados, cores }: { dados: Record<string, number>; cores: string[] }) => {
    const total = Object.values(dados).reduce((sum, value) => sum + value, 0);
    
    if (total === 0) {
      return (
        <div style={{ 
          height: '120px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#6B7280',
          fontSize: '14px'
        }}>
          Sem dados
        </div>
      );
    }

    let currentAngle = 0;
    
    return (
      <PieChartContainer>
        <svg width="120" height="120" viewBox="0 0 120 120">
          {Object.entries(dados).map(([label, value], index) => {
            const percentage = (value / total) * 100;
            const angle = (percentage / 100) * 360;
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const x1 = 60 + 40 * Math.cos(currentAngle * Math.PI / 180);
            const y1 = 60 + 40 * Math.sin(currentAngle * Math.PI / 180);
            const x2 = 60 + 40 * Math.cos((currentAngle + angle) * Math.PI / 180);
            const y2 = 60 + 40 * Math.sin((currentAngle + angle) * Math.PI / 180);
            
            const pathData = [
              `M 60 60`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            const currentColor = cores[index % cores.length];
            currentAngle += angle;
            
            return <path key={label} d={pathData} fill={currentColor} />;
          })}
          <circle cx="60" cy="60" r="20" fill="white" />
        </svg>
      </PieChartContainer>
    );
  };

  return (
    <ContainerPainel>
    
      <PageTopHeaderRow>
        <div>
          <PageTitle>Dashboard Operacional</PageTitle>
          <PageSubtitle>Visão geral das métricas e indicadores operacionais</PageSubtitle>
        </div>
        <ActionsRow>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select 
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                fontSize: '14px'
              }}
            >
              <option value="dia">Último Dia</option>
              <option value="semana">Última Semana</option>
              <option value="mes">Último Mês</option>
            </select>
          </div>
        </ActionsRow>
      </PageTopHeaderRow>

      {/* Alerta */}
      <DashboardAlert>
        <AlertContent>
          <AlertIndicator />
          <AlertText>
            <strong>Alerta: Aumento de 15% nas ocorrências em relação ao mês anterior</strong>
            <div>Região com maior crescimento: Recife Centro (23 ocorrências a mais)</div>
          </AlertText>
        </AlertContent>
      </DashboardAlert>

      {/* Métricas Principais */}
      <ResponsiveRow>
        <GridColumn weight={2}>
          <MiniGrid>
            
            <MetricCard>
              <h3>{estatisticas.totalOcorrencias}</h3>  
              <span>Total de Ocorrências</span>
              <MetricTrend trend="up">▲ 8,2% vs mês anterior</MetricTrend>
            </MetricCard>

          
            <MetricCard>
              <h3>{estatisticas.criticas}</h3>
              <span>Ocorrências Pendentes</span>
              <MetricTrend trend="neutral">— 2 desde ontem</MetricTrend>
            </MetricCard>

           
            <MetricCard>
              <h3>{estatisticas.tipoMaisComum?.quantidade || 0}</h3>
              <span>{estatisticas.tipoMaisComum?.tipo || "N/A"} (Top 1)</span>
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>
                {Object.entries(estatisticas.tiposOcorrencia)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([tipo, quant]) => (
                    <div key={tipo} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span>{tipo}:</span>
                      <span style={{ fontWeight: '600' }}>{quant}</span>
                    </div>
                  ))}
              </div>
            </MetricCard>
          </MiniGrid>
        </GridColumn>
      </ResponsiveRow>

      {/* Gráficos e Estatísticas */}
      <ResponsiveRow style={{ marginTop: '1.5rem' }}>
        {/* Ocorrências por Período */}
        <GridColumn weight={2}>
          <BoxInfo>
            <ChartHeader>
              <SectionTitle>Ocorrência por Período</SectionTitle>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>
                {filtroPeriodo === 'dia' && 'Último dia (24/10)'}
                {filtroPeriodo === 'semana' && 'Última semana (18/10 - 24/10)'}
                {filtroPeriodo === 'mes' && 'Último mês (Outubro)'}
              </div>
            </ChartHeader>
            <GraficoBarras dados={dadosGraficoPeriodo} />
          </BoxInfo>
        </GridColumn>

        {/* Ocorrências por Tipo */}
        <GridColumn weight={1}>
          <BoxInfo style={{ textAlign: 'center' }}>
            <SectionTitle>Ocorrência por Tipo</SectionTitle>
            <GraficoPizza 
              dados={estatisticas.tiposOcorrencia} 
              cores={['#EF4444', '#3B82F6', '#10B981', '#F59E0B']}
            />
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(estatisticas.tiposOcorrencia).map(([tipo, quantidade], index) => (
                <LegendItem key={tipo}>
                  <LegendColor color={['#EF4444', '#3B82F6', '#10B981', '#F59E0B'][index]} />
                  <LegendText>{tipo}</LegendText>
                  <LegendValue>{quantidade}</LegendValue>
                </LegendItem>
              ))}
            </div>
          </BoxInfo>
        </GridColumn>
      </ResponsiveRow>

      <ResponsiveRow style={{ marginTop: '1.5rem' }}>
        {/* Ocorrências por Região */}
        <GridColumn weight={2}>
          <BoxInfo>
            <SectionTitle>Ocorrência por Região</SectionTitle>
            <GraficoRegiaoContainer>
              <EixoY>
                {[4, 3, 2, 1, 0].map(valor => (
                  <ValorEixoY key={valor}>
                    {valor}
                  </ValorEixoY>
                ))}
              </EixoY>

              
              {Object.entries(estatisticas.ocorrenciasPorRegiao)
                .sort(([,a], [,b]) => b - a)
                .map(([regiao, quantidade]) => {
                  const maxOcorrencias = Math.max(...Object.values(estatisticas.ocorrenciasPorRegiao));
                  const altura = maxOcorrencias > 0 ? (quantidade / maxOcorrencias) * 120 : 0;
                  
                  return (
                    <BarraRegiaoContainer key={regiao}>
                      <BarraRegiao altura={altura} />
                      <ValorBarra>{quantidade}</ValorBarra>
                      <NomeRegiao>{regiao}</NomeRegiao>
                    </BarraRegiaoContainer>
                  );
                })}
            </GraficoRegiaoContainer>
          </BoxInfo>
        </GridColumn>

        {/* Estatísticas Rápidas */}
        <GridColumn weight={1}>
          <BoxInfo>
            <SectionTitle>Estatísticas Rápidas</SectionTitle>
            <StatsGrid>
              <StatItem style={{ color: '#EF4444' }}>
                <div>{estatisticas.criticas}</div>
                <div>Críticas</div>
              </StatItem>
              
              <StatItem style={{ color: '#3B82F6' }}>
                <div>{estatisticas.emAndamento}</div>
                <div>Em andamento</div>
              </StatItem>
              
              <StatItem style={{ color: '#10B981' }}>
                <div>{estatisticas.concluidas}</div>
                <div>Concluídas</div>
              </StatItem>
            </StatsGrid>
          </BoxInfo>
        </GridColumn>
      </ResponsiveRow>
    </ContainerPainel>
  );
}