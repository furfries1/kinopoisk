export function createPages(pages: number[], pagesCount:number, currentPage:number) {
    if(pagesCount > 10) {
        if(currentPage > 5) {
            for (let i = currentPage-4; i <= currentPage+5; i++) {
                pages.push(i)
                if(i === pagesCount) break
            }
        }
        else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if(i === pagesCount) break
            }
        }
    }  else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}

export const getRatingColor = (rating: number) => {
    if(rating >= 7) {
        return 'green'
    }
    else if(rating >=5) {
        return 'yellow'
    }
    else if(rating < 5 ) {
        return 'red'
    }
    else return 'hide'
}