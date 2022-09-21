import React from 'react'
import { useInfiniteGQLQuery } from '../../../utils/graphql/gqlInfiniteQuery';
import { concatPages } from '../utils/helper';
import { REPOS } from '../utils/query';
import { REPOPAGE, ROOTREPO } from '../utils/type';
import { useState } from 'react';

interface CommitsProps {
    repoowner: string 
    reponame: string
    token: string
}

export const Commits: React.FC<CommitsProps> = ({repoowner,reponame,token}) => {
    const [keyword, setKeyword] = useState({ word: '' })
    const query = useInfiniteGQLQuery(
        ["repo-commits", repoowner as string],
        token,
        REPOS,
        {
            repoowner,
            reponame,
            first: 25,
            after: null,
        },
        {
            getPreviousPageParam: (firstPage: REPOPAGE) => {
                return firstPage?.user?.repositories?.pageInfo?.startCursor ?? null;
            },
            getNextPageParam: (lastPage: REPOPAGE) => {
                // console.log(" end cursor  === ",lastPage.user.repositories.pageInfo.endCursor)
                return lastPage?.user?.repositories?.pageInfo?.endCursor ?? null;
            },
            select: (data: ROOTREPO) => {
                // return concatPages(data, keyword.word)
                return data
            }
        }
    );
   
return (
 <div>

 </div>
);
}
