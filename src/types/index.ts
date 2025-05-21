export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Order {
  id: string;
  products: Product[];
  total: number;
  status: "pending" | "completed" | "cancelled";
}

// Tipos para los props de los componentes
export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}
