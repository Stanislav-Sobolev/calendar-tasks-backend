import ICard from './ICard';

interface ICell { 
  id: number; 
  title: string; 
  items: ICard[]; 
}

export default ICell;