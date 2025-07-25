const pagination = document.getElementsByClassName('pagination')
const firstPageBtn = document.getElementsByClassName('start-btn')
const prevPageBtn = document.getElementsByClassName('prev-btn')
const nextPageBtn = document.getElementsByClassName('next-btn')
const lastPageBtn = document.getElementsByClassName('end-btn')

let totalPage = 0
let currentPage = 1
function initPagination(index, pageSize) {
    const bangumiItem = document.getElementsByClassName('bangumi-container')[index].getElementsByClassName('bangumi-item')

    currentPage = 1
    totalPage = Math.ceil(bangumiItem.length / pageSize)

    if (pagination) {
        for (let i = 0; i < pagination.length; i++) {
            pagination[i].classList.add('hide')
        }

        if (totalPage > 1) {
            pagination[index].classList.remove('hide')

            const pageInfo = document.getElementsByClassName('page-info')[index]
            if (pageInfo) pageInfo.innerHTML = `1 / ${totalPage}`
        }

        for (let i = 0; i < bangumiItem.length; i++) {
            if (i >= pageSize) {
                bangumiItem[i].classList.add('hide')
            } else {
                bangumiItem[i].classList.remove('hide')
            }
        }

        firstPageBtn[index].classList.add('disabled')
        prevPageBtn[index].classList.add('disabled')
        nextPageBtn[index].classList.remove('disabled')
        lastPageBtn[index].classList.remove('disabled')
    }
}

function toFirstPage(index, pageSize) {
    if (currentPage === 1) return
    const bangumiItem = document.getElementsByClassName('bangumi-container')[index].getElementsByClassName('bangumi-item')

    for (let i = (currentPage - 1) * pageSize; i < bangumiItem.length; i++) {
        if (i < currentPage * pageSize) {
            bangumiItem[i].classList.add('hide')
        } else {
            break
        }
    }

    for (let i = 0; i < bangumiItem.length; i++) {
        if (i < pageSize) {
            bangumiItem[i].classList.remove('hide')
        }
    }

    currentPage = 1
    const pageInfo = document.getElementsByClassName('page-info')[index]
    if (pageInfo) pageInfo.innerHTML = `${currentPage} / ${totalPage}`

    firstPageBtn[index].classList.add('disabled')
    prevPageBtn[index].classList.add('disabled')
    nextPageBtn[index].classList.remove('disabled')
    lastPageBtn[index].classList.remove('disabled')
}

function toPrevPage(index, pageSize) {
    if (currentPage === 1) return
    const bangumiItem = document.getElementsByClassName('bangumi-container')[index].getElementsByClassName('bangumi-item')

    for (let i = (currentPage - 1) * pageSize; i < bangumiItem.length; i++) {
        if (i < currentPage * pageSize) {
            bangumiItem[i].classList.add('hide')
        } else {
            break
        }
    }

    for (let i = (currentPage - 2) * pageSize; i < (currentPage - 1) * pageSize; i++) {
        bangumiItem[i].classList.remove('hide')
    }

    currentPage = Math.max(currentPage - 1, 1)
    const pageInfo = document.getElementsByClassName('page-info')[index]
    if (pageInfo) pageInfo.innerHTML = `${currentPage} / ${totalPage}`

    if (currentPage === 1) {
        firstPageBtn[index].classList.add('disabled')
        prevPageBtn[index].classList.add('disabled')
    } else {
        firstPageBtn[index].classList.remove('disabled')
        prevPageBtn[index].classList.remove('disabled')
    }
    nextPageBtn[index].classList.remove('disabled')
    lastPageBtn[index].classList.remove('disabled')
}

function toNextPage(index, pageSize) {
    if (currentPage === totalPage) return
    const bangumiItem = document.getElementsByClassName('bangumi-container')[index].getElementsByClassName('bangumi-item')

    for (let i = (currentPage - 1) * pageSize; i < currentPage * pageSize; i++) {
        bangumiItem[i].classList.add('hide')
    }

    for (let i = currentPage * pageSize; i < bangumiItem.length; i++) {
        if (i < (currentPage + 1) * pageSize) {
            bangumiItem[i].classList.remove('hide')
        } else {
            break
        }
    }

    currentPage = Math.min(currentPage + 1, totalPage)
    const pageInfo = document.getElementsByClassName('page-info')[index]
    if (pageInfo) pageInfo.innerHTML = `${currentPage} / ${totalPage}`

    firstPageBtn[index].classList.remove('disabled')
    prevPageBtn[index].classList.remove('disabled')
    if (currentPage === totalPage) {
        nextPageBtn[index].classList.add('disabled')
        lastPageBtn[index].classList.add('disabled')
    } else {
        nextPageBtn[index].classList.remove('disabled')
        lastPageBtn[index].classList.remove('disabled')
    }
}

function toLastPage(index, pageSize) {
    if (currentPage === totalPage) return
    const bangumiItem = document.getElementsByClassName('bangumi-container')[index].getElementsByClassName('bangumi-item')

    for (let i = (currentPage - 1) * pageSize; i < bangumiItem.length; i++) {
        if (i < currentPage * pageSize) {
            bangumiItem[i].classList.add('hide')
        } else {
            break
        }
    }

    for (let i = (totalPage - 1) * pageSize; i < bangumiItem.length; i++) {
        bangumiItem[i].classList.remove('hide')
    }

    currentPage = totalPage
    const pageInfo = document.getElementsByClassName('page-info')[index]
    if (pageInfo) pageInfo.innerHTML = `${currentPage} / ${totalPage}`

    firstPageBtn[index].classList.remove('disabled')
    prevPageBtn[index].classList.remove('disabled')
    nextPageBtn[index].classList.add('disabled')
    lastPageBtn[index].classList.add('disabled')
}
