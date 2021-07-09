import React,{useEffect, useState} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import {Link} from 'react-router-dom'

function ScreenSource() {
//apikey: 4e75e751f7bb426886857e3abc8293b8
const [language, setLanguage] = useState('fr')

  const url = `https://newsapi.org/v2/sources?language=${language}&apiKey=4e75e751f7bb426886857e3abc8293b8`
  const [sourceList, setSourceList] = useState([])
  useEffect(() => {
    const getSource = async () => {
      const source = await fetch(url)
      const sourceJson = await source.json()
      console.log(sourceJson.sources)
      setSourceList(sourceJson.sources)
    }
    getSource()
  }, [language])

  const changeToFrench = () => {
    setLanguage('fr')
  }

  const changeToEnglish = () => {
    setLanguage('en')
  }
  return (
    <div>
        <Nav/>
       
       <div className="Banner center">
        <img className="flag" src="/images/fr-flag.png" onClick={() => changeToFrench()} />
        <img className="flag" src="/images/en-flag.jpeg" onClick={() => changeToEnglish()}/>
        </div> 
        
       <div className="HomeThemes">
           
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${item.category}.png`} />}
                        title={<Link to={`screen-article-by-source/${item.id}`}>{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

export default ScreenSource;
