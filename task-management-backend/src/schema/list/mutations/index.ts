import { CreateList, UpdateListName, UpdateListPosition, DeleteList } from "./list-mutations";

const ListMutationFields = {
    createList: CreateList,
    updateListName: UpdateListName,
    updateListPosition: UpdateListPosition,
    deleteList: DeleteList,
};

export default ListMutationFields;