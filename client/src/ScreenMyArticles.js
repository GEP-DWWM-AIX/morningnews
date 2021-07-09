import React, { useEffect } from 'react';
import './App.css';
import { Card, Icon} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {




  useEffect(() => {
    console.log('je suis dans screen my article')
    // const getarticleLiked = async () => {
    //   const response = await fetch('/articles-by-user/monsupertokenquivientdufront')
    //   const responseJson = await response
    //   console.log(responseJson)
    // }
    // getarticleLiked()
  }, [])






  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
    
                    <div  style={{display:'flex',justifyContent:'center'}}>
                      {
                        props.articles.map((item, i) => {
                          return(
                            <Card
                            key={i}
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
                                <Icon type="read" key="ellipsis2" />,
                                <Icon type="delete" onClick={() => props.deleteToWishList(item.title) } key="ellipsis" />
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



       

                

             </div>
      
 

      </div>
  );
}

const mapStateToProps = (state) => {
  return {articles: state.articles}
}

const mapDispatchToProps = (dispatch) => {
  return{
    deleteToWishList: function(title){
      dispatch({type: 'deleteArticle', articleTitle: title})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles)
