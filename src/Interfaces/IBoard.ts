import ICell from './ICell';

interface  IBoard {
  id: String,
  name: String,
  cellsData: [ICell],
  save: () => void
};

export default IBoard;
