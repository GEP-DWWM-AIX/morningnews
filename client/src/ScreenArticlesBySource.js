import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, Icon} from 'antd';
import Nav from './Nav'
import { useParams } from "react-router-dom";
import { Modal } from 'antd';
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  const [articleList, setArticleList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  var { source } = useParams()
  let url = `https://newsapi.org/v2/everything?q=${source}&language=fr&apiKey=4e75e751f7bb426886857e3abc8293b8`
  useEffect(() => {
    const getArticles = async () => {
      const articles = await fetch(url)
      const articlesJson = await articles.json()
      console.log(articlesJson.articles)
      setArticleList(articlesJson.articles)
    }
    getArticles()
  }, [])
  const showModal = (titleArticle, contentArticle) => {
    setIsModalVisible(true);
    setTitle(titleArticle)
    setContent(contentArticle)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
    
              <div  style={{display:'flex',justifyContent:'center', flexWrap: 'wrap'}}>
              {
                articleList.map((item, i) => {
                  return(
                    <Card key={i}
                      style={{
                        width: 300,
                        margin: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                      cover={
                        <img
                          alt="example"
                          src={item.urlToImage}
                        />
                      }
                      actions={[
                        <Icon type="read" key="ellipsis2" onClick={() => showModal(item.title, item.content)} />,
                        <Icon type="like" key="ellipsis" onClick={() => props.addToWishList(item, props.userToken)} />
                      ]}
                    >

                      <Meta
                        title={item.title}
                        description={item.description}
                      />

                    </Card>
                  )
                })
              }
                

              </div>


        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>{title}</p>
          <p>{content}</p>
        </Modal>

           </div>
      
      </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article, token) {
      dispatch({ type: 'likeArticle', article: article, userToken: token })
    }
  }
}

function mapStateToProps(state){
  return ({ userToken: state.token })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
