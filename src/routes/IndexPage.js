import React from 'react';
import { connect } from 'dva';
import { Table,Tag,Button,Modal,Tooltip } from 'antd';
import styles from './IndexPage.css';
class IndexPage extends React.Component{
  constructor(){
    super();
  }
  render(){
    let {data,isShow}=this.props;
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render:description=> <Tooltip placement="top" title={description}><p className={styles.description}>{description}</p></Tooltip>
    }, {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      render:image => <img src={image}></img>
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            return <Tag color={'blue'} key={tag}>{tag}</Tag>;
          })}
        </span>
      ),
    }, {
      title: 'baseURL',
      key: 'baseURL',
      render: baseURL => (
         <a href={baseURL.baseURL}>详情</a>
      ),
    }, {
      title: '操作',
      key: 'delog',
      render: (properties) => (
        <div>
          <Button type="primary" onClick={()=>{this.props.showModel(properties.properties)}}>编辑</Button>
        </div>
      ),
    }];
    const modalColumns = [{
      title: 'type',
      dataIndex: 'type',
      key: 'type'
    }, {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
      render:url=> <a href={url}>详情</a>
    }];
    return (
      <div>
        <Modal
          title="action show modal"
          visible={isShow}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
        >
        <Table columns={modalColumns} dataSource={this.props.modaldata} pagination={false}/>
        </Modal>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </div>
    )  
  }
  
  componentDidMount(){
    this.props.getData()
  }
}
const mapStateToProps = state=>{
  return {
    data:state.example.data,
    isShow:state.example.isShow,
    modaldata:state.example.modaldata
  };
}
const mapDispatchToProps = dispatch=>{
  return {
    getData: ()=>{
      dispatch({
        type:"example/fetch"
      })
    },
    showModel:(payload)=>{
      dispatch({
        type:"example/showModel",
        payload
      })
    },
    handleOk:()=>{
      dispatch({
        type:"example/ok"
      })
    },
    handleCancel:()=>{
      dispatch({
        type:"example/cancel"
      })
    }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);
