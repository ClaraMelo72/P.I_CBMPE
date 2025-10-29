import { useParams, useNavigate } from "react-router-dom";
import {
  ContainerPainel,
  PageTopHeader,
  PageTitle,
  PageSubtitle,
  BoxInfo,
  SectionTitle,
  Grid,
  Field,
  FullField,
  ResponsiveRow,
  GridColumn,
  ActionsRow,
  MapFullBox,
  MapPlaceholder,
  PersonCard,
  PersonCardHeader,
  PreviewList,
  SectionSubtitle,
  Divider,
  SignatureBox} from "../../components/EstilosPainel.styles";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Button } from "../../components/Button";
import { 
  ArrowLeftIcon, 
  FileTextIcon, 
  MapPinIcon, 
  FireTruckIcon, 
  UserIcon, 
  PaperclipIcon, 
  GearIcon, 
  ClipboardTextIcon,
  EyeIcon,
  DownloadIcon
} from "@phosphor-icons/react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


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
    
    descricaoResumida: "Incêndio em apartamento no 5º andar do edifício Solar da Praia. Vítimas presas no interior.",
    unidadeResponsavel: "1º GBM - Recife",
    chefe: "Sgt. Carlos Silva",
    lider: "Cb. Ana Costa",
    equipe: ["Sgt. Carlos Silva", "Cb. Ana Costa", "Sd. Pedro Lima", "Sd. Maria Santos"],
    pontoBase: "Na base",
    numeracaoViatura: "VT-001",
    tempoResposta: "15",
    observacoesAdicionais: "Fogo controlado em 45 minutos. Duas vítimas resgatadas com ferimentos leves.",
    municipio: "Recife",
    bairro: "Boa Viagem",
    logradouro: "Av. Boa Viagem",
    numero: "1234",
    complemento: "Edifício Solar da Praia, apt 501",
    referencia: "Próximo ao hotel Mar",
    latitude: "-8.1195",
    longitude: "-34.9038",
    pessoas: [
      {
        id: 1,
        nome: "João Silva",
        idade: "35",
        documento: "123.456.789-00",
        condicao: "Ferido"
      },
      {
        id: 2,
        nome: "Maria Oliveira",
        idade: "28",
        documento: "987.654.321-00",
        condicao: "Ileso"
      }
    ],
    arquivos: ["foto_incendio_01.jpg", "relatorio_resgate.pdf"],
    assinatura: "assinatura_responsavel.png",
    atendente: "Ana Paula",
    dataRegistro: "20/10/2025 08:45",
    ipOrigem: "192.167.2.100"
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
    descricaoResumida: "Queda de altura em obra civil. Vítima consciente com suspeita de fratura.",
    unidadeResponsavel: "2º GBM - Olinda",
    chefe: "Cb. Ana Costa",
    lider: "Sd. Pedro Lima",
    equipe: ["Cb. Ana Costa", "Sd. Pedro Lima", "Sd. João Santos"],
    pontoBase: "Em deslocamento",
    numeracaoViatura: "VT-002",
    tempoResposta: "12",
    observacoesAdicionais: "Vítima estabilizada e encaminhada ao Hospital da Restauração.",
    municipio: "Olinda",
    bairro: "Bairro Novo",
    logradouro: "Rua do Sol",
    numero: "567",
    complemento: "Obra do Condomínio Solar",
    referencia: "Ao lado da escola municipal",
    latitude: "-8.0019",
    longitude: "-34.8452",
    pessoas: [
      {
        id: 1,
        nome: "Pedro Santos",
        idade: "42",
        documento: "456.789.123-00",
        condicao: "Ferido"
      }
    ],
    arquivos: ["foto_acidente.jpg", "laudo_medico.pdf"],
    assinatura: "assinatura_responsavel_002.png",
    atendente: "Carlos Eduardo",
    dataRegistro: "19/10/2025 14:30",
    ipOrigem: "192.167.2.101"
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
    descricaoResumida: "Mal súbito em via pública. Idoso com queixa de dor torácica.",
    unidadeResponsavel: "3º GBM - Jaboatão",
    chefe: "Sd. Pedro Lima",
    lider: "Sgt. Maria Oliveira",
    equipe: ["Sd. Pedro Lima", "Sgt. Maria Oliveira"],
    pontoBase: "Voltando para a base",
    numeracaoViatura: "VT-003",
    tempoResposta: "8",
    observacoesAdicionais: "Vítima encaminhada para avaliação cardiológica.",
    municipio: "Jaboatão dos Guararapes",
    bairro: "Prazeres",
    logradouro: "Av. Bernardo Vieira de Melo",
    numero: "890",
    complemento: "",
    referencia: "Em frente ao shopping",
    latitude: "-8.1125",
    longitude: "-35.0147",
    pessoas: [
      {
        id: 1,
        nome: "Antônio Costa",
        idade: "68",
        documento: "789.123.456-00",
        condicao: "Ferido"
      }
    ],
    arquivos: ["prontuario_aph.pdf"],
    assinatura: "assinatura_responsavel_003.png",
    atendente: "Mariana Silva",
    dataRegistro: "18/10/2025 11:00",
    ipOrigem: "192.167.2.102"
  },
  
];


if ("Marker" in L && !(L as any)._copilot_icon_set) {
  const DefaultIcon = L.icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  (L as any).Marker.prototype.options.icon = DefaultIcon;
  (L as any)._copilot_icon_set = true;
}

export function DetalhesOcorrencia() {
  const { id } = useParams<{ id: string }>();
  const decodedId = decodeURIComponent(id || "");
  const ocorrencia = ocorrencias.find(o => o.id === decodedId);
  const navigate = useNavigate();



  if (!ocorrencia) {
    return (
      <ContainerPainel>
        <PageTopHeader>
          <Breadcrumb
            items={[
              { label: "Ocorrências", onClick: () => navigate("/ocorrencias") },
              { label: "Detalhes da Ocorrência" },
            ]}
          />
          <PageTitle>Ocorrência Não Encontrada</PageTitle>
          <PageSubtitle>A ocorrência solicitada não existe ou foi removida.</PageSubtitle>
        </PageTopHeader>
        <ActionsRow>
          <Button 
            text={<><ArrowLeftIcon size={16} style={{ marginRight: 8 }} />Voltar para Lista</>} 
            onClick={() => navigate("/ocorrencias")} 
            variant="secondary" 
          />
        </ActionsRow>
      </ContainerPainel>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em andamento": return "#3B82F6";
      case "Concluído": return "#10B981";
      case "Pendente": return "#EF4444";
      default: return "#6B7280";
    };
  };

  const handleVoltar = () => navigate("/ocorrencias");
  const handleImprimir = () => window.print();
  const handleEditar = () => navigate(`/ocorrencias/editar/${id}`);

  return (
    <ContainerPainel>
      <PageTopHeader>
        <Breadcrumb
          items={[
            { label: "Ocorrências", onClick: handleVoltar },
            { label: "Detalhes da Ocorrência" },
          ]}
        />
        <PageTitle>Detalhes da Ocorrência</PageTitle>
        <PageSubtitle>Visualização completa dos dados registrados para esta ocorrência.</PageSubtitle>
      </PageTopHeader>

      <ActionsRow>
        <Button 
          text={<><ArrowLeftIcon size={16} style={{ marginRight: 8 }} />Voltar para Lista</>} 
          onClick={handleVoltar} 
          variant="secondary" 
        />
        <Button 
          text={<><DownloadIcon size={16} style={{ marginRight: 8 }} />Exportar PDF</>} 
          onClick={handleImprimir} 
          variant="secondary" 
        />
        <Button 
          text="Editar Ocorrência" 
          onClick={handleEditar} 
          variant="primary" 
        />
      </ActionsRow>

  
      <ResponsiveRow>
        <GridColumn weight={1}>
          <BoxInfo>
            <SectionTitle><FileTextIcon size={22} weight="fill" />Dados Principais</SectionTitle>
            <Grid>
              <Field>
                <label>ID da Ocorrência</label>
                <input value={ocorrencia.id} readOnly />
              </Field>
              <Field>
                <label>Status</label>
                <input 
                  value={ocorrencia.status} 
                  readOnly 
                  style={{ color: getStatusColor(ocorrencia.status), fontWeight: 600 }}
                />
              </Field>
              <Field>
                <label>Tipo de Ocorrência</label>
                <input value={ocorrencia.tipo} readOnly />
              </Field>
              <Field>
                <label>Data/Hora do Chamado</label>
                <input value={`${ocorrencia.data} ${ocorrencia.hora}`} readOnly />
              </Field>
              <FullField>
                <label>Descrição Resumida</label>
                <textarea value={ocorrencia.descricaoResumida} readOnly rows={3} />
              </FullField>
            </Grid>
          </BoxInfo>
        </GridColumn>
      </ResponsiveRow>

      {/* Localização */}
      <ResponsiveRow>
        <GridColumn weight={1}>
          <BoxInfo>
            <SectionTitle><MapPinIcon size={22} weight="fill" /> Localização</SectionTitle>
            <Grid>
              <Field>
                <label>Município</label>
                <input value={ocorrencia.municipio} readOnly />
              </Field>
              <Field>
                <label>Bairro</label>
                <input value={ocorrencia.bairro} readOnly />
              </Field>
              <Field>
                <label>Logradouro</label>
                <input value={ocorrencia.logradouro} readOnly />
              </Field>
              <Field>
                <label>Número</label>
                <input value={ocorrencia.numero} readOnly />
              </Field>
              <Field>
                <label>Complemento</label>
                <input value={ocorrencia.complemento} readOnly />
              </Field>
              <Field>
                <label>Referência</label>
                <input value={ocorrencia.referencia} readOnly />
              </Field>
              <Field>
                <label>Latitude</label>
                <input value={ocorrencia.latitude} readOnly />
              </Field>
              <Field>
                <label>Longitude</label>
                <input value={ocorrencia.longitude} readOnly />
              </Field>
            </Grid>
            
            {/* Mapa */}
            <Grid>
              <Field>
                <MapFullBox>
                  {ocorrencia.latitude && ocorrencia.longitude ? (
                    <MapContainer
                      center={[Number(ocorrencia.latitude), Number(ocorrencia.longitude)]}
                      zoom={17}
                      style={{ height: "100%", width: "100%" }}
                      scrollWheelZoom
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[Number(ocorrencia.latitude), Number(ocorrencia.longitude)]} />
                    </MapContainer>
                  ) : (
                    <MapPlaceholder>
                      Localização não disponível
                    </MapPlaceholder>
                  )}
                </MapFullBox>
              </Field>
            </Grid>
          </BoxInfo>
        </GridColumn>
      </ResponsiveRow>

      {/* Equipes e Viaturas */}
      <ResponsiveRow>
        <GridColumn weight={1}>
          <BoxInfo>
            <SectionTitle><FireTruckIcon size={22} weight="fill" /> Equipes e Viaturas</SectionTitle>
            <Grid>
              <Field>
                <label>Unidade Responsável</label>
                <input value={ocorrencia.unidadeResponsavel} readOnly />
              </Field>
              <Field>
                <label>Chefe de Ocorrência</label>
                <input value={ocorrencia.chefe} readOnly />
              </Field>
              <Field>
                <label>Líder Militar</label>
                <input value={ocorrencia.lider} readOnly />
              </Field>
              <Field>
                <label>Ponto Base</label>
                <input value={ocorrencia.pontoBase} readOnly />
              </Field>
              <Field>
                <label>Viatura Utilizada</label>
                <input value={ocorrencia.viatura} readOnly />
              </Field>
              <Field>
                <label>Numeração da Viatura</label>
                <input value={ocorrencia.numeracaoViatura} readOnly />
              </Field>
              <FullField>
                <label>Equipe Envolvida</label>
                <div style={{ 
                  border: "1px solid #cbd5e1", 
                  borderRadius: "8px", 
                  padding: "12px", 
                  backgroundColor: "#f8fafc",
                  minHeight: "60px"
                }}>
                  {ocorrencia.equipe.map((membro, index) => (
                    <div key={index} style={{ marginBottom: "4px" }}>
                      • {membro}
                    </div>
                  ))}
                </div>
              </FullField>
            </Grid>
          </BoxInfo>
        </GridColumn>
      </ResponsiveRow>

     
{/* Vítimas e Pessoas Envolvidas */}
<ResponsiveRow>
  <GridColumn weight={1}>
    <BoxInfo>
      <SectionTitle><UserIcon size={22} weight="fill" /> Vítimas e Pessoas Envolvidas</SectionTitle>
      <BoxInfo>
      
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1rem'
        }}>
          {ocorrencia.pessoas.length === 0 && (
            <div style={{ gridColumn: "1 / -1", color: "#64748b", padding: 12, justifyContent: "center", display: "flex" }}>
              Nenhuma pessoa adicionada
            </div>
          )}
          {ocorrencia.pessoas.map((pessoa, idx) => (
            <PersonCard key={pessoa.id}>
              <PersonCardHeader>
                <strong>Pessoa {idx + 1}</strong>
              </PersonCardHeader>
              
  
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.75rem'
              }}>
                <Field>
                  <label>Nome Completo</label>
                  <input value={pessoa.nome} readOnly />
                </Field>
                <Field>
                  <label>Idade</label>
                  <input value={pessoa.idade} readOnly />
                </Field>
                <Field>
                  <label>Documento</label>
                  <input value={pessoa.documento} readOnly />
                </Field>
                <Field>
                  <label>Condição</label>
                  <input value={pessoa.condicao} readOnly />
                </Field>
              </div>
            </PersonCard>
          ))}
        </div>
      </BoxInfo>
    </BoxInfo>
  </GridColumn>
</ResponsiveRow>

      {/* Anexos e Evidências */}
      <ResponsiveRow>
        <GridColumn weight={1}>
          <BoxInfo>
            <SectionTitle><PaperclipIcon size={22} weight="fill" /> Anexos e Evidências</SectionTitle>
            
            <SectionSubtitle>Fotos e Arquivos</SectionSubtitle>
            {ocorrencia.arquivos.length > 0 ? (
              <PreviewList>
                {ocorrencia.arquivos.map((arquivo, index) => (
                  <div key={index} style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    padding: "8px 12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    marginBottom: "8px"
                  }}>
                    <span>{arquivo}</span>
                    <Button 
                      text={<><EyeIcon size={14} style={{ marginRight: 4 }} />Visualizar</>} 
                      variant="secondary" 
                      style={{ padding: "4px 8px", fontSize: "12px" }}
                    />
                  </div>
                ))}
              </PreviewList>
            ) : (
              <div style={{ color: "#64748b", padding: 12, textAlign: "center" }}>
                Nenhum arquivo anexado
              </div>
            )}

            <Divider />
            
            <SectionSubtitle>Assinatura do Responsável</SectionSubtitle>
            <SignatureBox>
              {ocorrencia.assinatura ? (
                <div style={{ 
                  background: "white", 
                  border: "1px solid #ccc", 
                  borderRadius: "6px", 
                  padding: "20px",
                  textAlign: "center",
                  minHeight: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ color: "#64748b" }}>Assinatura digital registrada</span>
                </div>
              ) : (
                <div style={{ 
                  background: "#f9f9f9", 
                  border: "2px dashed #ccc", 
                  borderRadius: "6px", 
                  padding: "20px",
                  textAlign: "center",
                  minHeight: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ color: "#64748b" }}>Assinatura não disponível</span>
                </div>
              )}
            </SignatureBox>
          </BoxInfo>
        </GridColumn>
      </ResponsiveRow>

      {/* Detalhes Operacionais */}
      <ResponsiveRow>
        <GridColumn weight={1}>
          <BoxInfo>
            <SectionTitle><GearIcon size={22} weight="fill" /> Detalhes Operacionais</SectionTitle>
            <Grid>
              <Field>
                <label>Tempo de Resposta (min)</label>
                <input value={ocorrencia.tempoResposta} readOnly />
              </Field>
              <FullField>
                <label>Observações Adicionais</label>
                <textarea value={ocorrencia.observacoesAdicionais} readOnly rows={4} />
              </FullField>
            </Grid>
          </BoxInfo>
        </GridColumn>
      </ResponsiveRow>

      {/* Informações de Auditoria */}
      <ResponsiveRow>
        <GridColumn weight={1}>
          <BoxInfo>
            <SectionTitle><ClipboardTextIcon size={22} weight="fill" /> Informações de Auditoria</SectionTitle>
            <Grid>
              <Field>
                <label>Atendente Responsável</label>
                <input value={ocorrencia.atendente} readOnly />
              </Field>
              <Field>
                <label>Data/Hora do Registro</label>
                <input value={ocorrencia.dataRegistro} readOnly />
              </Field>
              <Field>
                <label>IP de Origem</label>
                <input value={ocorrencia.ipOrigem} readOnly />
              </Field>
            </Grid>
          </BoxInfo>
        </GridColumn>
      </ResponsiveRow>
    </ContainerPainel>
  );
}