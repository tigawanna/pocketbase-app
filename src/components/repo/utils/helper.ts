import { ROOTREPO} from "./type";


export const concatPages=(repo:ROOTREPO,keyword:string)=>{

let totalRepos = repo.pages[0].user.repositories.edges
let i = 1
for(i=1;i<repo.pages.length;i++){
 if(repo?.pages){
    totalRepos = [...totalRepos,...repo.pages[i].user.repositories.edges]
 }
}
// console.log("total repos ==== ",totalRepos)
const filtered = totalRepos.filter((item) =>
  item.node.name.toLowerCase().includes(keyword.toLowerCase())
);
// console.log("everything ===== ",totalRepos);
// console.log("filtered ===== ",filtered)
const base = repo.pages[repo.pages.length -1].user;
const user = {
    ...base,
    login:base.login,
    repositories:{
    edges:filtered, 
    totalCount:base.repositories.totalCount,
    pageInfo:base.repositories.pageInfo
}}
const final:ROOTREPO =
{
pageParams:[...repo.pageParams],
pages:[{user:user}]
}
//console.log("fibal list === ",final)
return final
}



