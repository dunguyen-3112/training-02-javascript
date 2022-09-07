

import { HandleFindAll, HandleFindById, HandleFindByName, HandleDelete, HandleAdd, HandleUpdate } from "../model/main.js";

const FindAllUser = () => HandleFindAll().then(data => data.json())

const FindUserByName = (name) => HandleFindByName(name).then(data => data.json())
const FindUserById = (id) => HandleFindById(id).then(data => data.json())

export { FindAllUser, FindUserByName, FindUserById }




