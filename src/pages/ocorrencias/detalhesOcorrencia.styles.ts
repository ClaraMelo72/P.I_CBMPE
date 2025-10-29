import styled from "styled-components";


export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case "Em andamento": return "#DBEAFE";
      case "Concluído": return "#D1FAE5";
      case "Pendente": return "#FEE2E2";
      default: return "#F3F4F6";
    }
  }};
  color: ${props => {
    switch (props.status) {
      case "Em andamento": return "#1E40AF";
      case "Concluído": return "#065F46";
      case "Pendente": return "#991B1B";
      default: return "#374151";
    }
  }};
`;

export const DetailSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const DetailField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }
  
  .value {
    padding: 0.75rem;
    background-color: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    color: #374151;
    min-height: 42px;
    display: flex;
    align-items: center;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #E5E7EB;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export {
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
  SignatureBox
} from "../../components/EstilosPainel.styles";