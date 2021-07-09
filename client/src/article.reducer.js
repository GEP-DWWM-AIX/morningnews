export default function(articles = [], action) {
    if (action.type === 'likeArticle'){
        const articleCopy = [...articles]
        //afficher le token
        console.log('article reducer: ', action.userToken)
        articleCopy.push(action.article)
        fetch('/article', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `title=${action.article.title}&desc=${action.article.content}&image=${action.article.urlToImage}&token=${action.userToken}`
        })
    
        return articleCopy
    } else if (action.type === 'deleteArticle'){
        const articleCopy = [...articles];
        const newArticles = articleCopy.filter(e =>  e.title !== action.articleTitle);
        fetch('/article/' + action.articleTitle, {
            method: 'DELETE'
        })
        return newArticles;
    }
    else{
        return articles
    }
}