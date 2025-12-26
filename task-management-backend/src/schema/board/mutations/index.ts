import { CloseBoard, CreateBoard, UpdateBoardInformation, UpdateBoardMembers, UpdateBoardName } from "./board-mutations";

const BoardMutationFields = {
  createBoard: CreateBoard,
  updateBoardName: UpdateBoardName,
  updateBoardMembers: UpdateBoardMembers,
  updateBoardInformation: UpdateBoardInformation,
  closeBoard: CloseBoard,
};

export default BoardMutationFields;
