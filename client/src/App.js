import React, { Component, useContext, useState } from 'react';
import styled from 'styled-components'
import Navbar from './Components/Navbar'
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UploadFile from './Components/UploadFile';
import ImageItem from './Components/ImageItem';
import ChangePass from './Components/ChangePass';
import CreateSubject from './Components/CreateSubject';
import ListSubject from './Components/ListSubject'
import SubjectDetail from './Components/SubjectDetail';
import { Grid, Paper } from '@material-ui/core'
import CreateExercise from './Components/CreateExercise';
import ListExercise from './Components/ListExercise';
import EditExercise from './Components/EditExercise';
import Body from './Components/views/BodyPage/Body'
import { AuthContext } from './Context/AuthContext';
import BlogPage from './Components/views/BlogPage/BlogPage';
// import Footer from './Components/views/Footer/Footer'
import ScrollButton from './Components/views/ScrollUp/ScrollButton'
import NextPre from './Components/views/Test/NextPre';
import NextPreBtgv from './Components/views/Test/NextPreBtgv';
import TestSearchParam from './Components/views/Test/TestSearchParam';
import AppPanigation from './Components/views/AllPostPage/AllPostBtc/AppPanigation';
import AppPanigationBtgv from './Components/views/AllPostPage/AllPostBtgv/AppPanigationBtgv';
import GioiThieuBoMon from './Components/NavBarInfo/GioiThieu/GioiThieuBoMon';
import GioiThieuNhanSu from './Components/NavBarInfo/GioiThieu/GioiThieuNhanSu';
import DaoTao from './Components/NavBarInfo/DaoTao/DaoTao';
import Dgyk from './Components/NavBarInfo/HoatDong/Dgyk';
import CreatePage from './Components/views/BlogPage/Section.js/CreatePage'
import CreatePage1 from './Components/views/BlogPage/Section.js/CreatePage1'
import CreatePage2 from './Components/views/BlogPage/Section.js/CreatePage2'
import PostPage from './Components/views/PostPage/PostPage';
import PostPageBtgv from './Components/views/PostPage/PostPageBtgv';
import UpdatePost from './Components/views/EditorPage/UpdatePost';
import UpdatePostBtgv from './Components/views/EditorPage/UpdatePostBtgv';
import Result from './Components/Result';
import Footer from './Components/views/Footer/Footer'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FormValidation from './Components/FormValidation';
import ListFileOfExercise from './Components/ListFileOfExercise';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
function App(props) {

  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  };
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  return (
    <Router >
      {!isAuthenticated ?
        <WrapperNotAuthen>
          <Navbar />
          <ScrollButton scrollStepInPx="80" delayInMs="16.66" />
          <Grid container className="grid-container">
            <Grid className="grid-xs9">

              <Paper elevation={6} className="paper-container">
                <Switch>
                  <UnPrivateRoute path="/login" component={Login} style={{ marginTop: "50px" }} />
                  <Route exact path="/blog/post/detail/:postId/:index" component={NextPre} />
                  <Route exact path="/blog1/post/detail/:postId/:index" component={NextPreBtgv} />
                  <Route exact path="/blog/post/detail/:postId" component={PostPage} />
                  <Route exact path="/blog1/post/detail/:postId" component={PostPageBtgv} />
                  <Route exact path="/search/:search" component={TestSearchParam} />
                  <Route exact path="/allpostbantinchung" component={AppPanigation} />
                  <Route exact path="/allpostbantingiaovu" component={AppPanigationBtgv} />
                  <Route exact path="/gioithieubomon" component={GioiThieuBoMon} />
                  <Route exact path="/gioithieunhansu" component={GioiThieuNhanSu} />
                  <Route exact path="/daotao" component={DaoTao} />
                  <Route exact path="/dgyk" component={Dgyk} />
                  <Route exact path="/blogpage" component={BlogPage} />
                  <Route exact path="/" component={Body} />
                  <Route path="/formvalidation" component={FormValidation} />
                </Switch>
              </Paper>
            </Grid>
            <Grid className="grid-xs3">
              <BlogPage />
            </Grid>
          </Grid>
          <div className="footer"><Footer /></div>
        </WrapperNotAuthen>
        :
        <WrapperAuthen>
          <Navbar />
          <ScrollButton scrollStepInPx="80" delayInMs="16.66" />
          <Grid container>
            <Grid xs={12} className="grid-xs12">
              <Wrapper>
                <Layout>
                  <Sider trigger={null} collapsible collapsed={collapsed} style={{fontFamily:"Roboto"}}>
                    <div className="logo text-center">{collapsed?<MenuUnfoldOutlined style={{verticalAlign:'sub',fontSize:"1.5em",color:"white"}}  onClick={toggle}/>:<MenuFoldOutlined style={{verticalAlign:'sub',fontSize:"1.5em",color:"white"}}  onClick={toggle}/>}</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                      <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to='/listSubject'><i className="fa fa-list" style={{ marginRight: "15px" }} />{collapsed ? '' : 'Danh sách môn học'}</Link>
                      </Menu.Item>
                      {user.role === "user" ? <Menu.Item key="2">
                        <Link to='/result'><i className="fa fa-check-square" style={{ marginRight: "15px" }} />{collapsed ? '' : 'Kết quả'}</Link>
                      </Menu.Item> : ''}
                      {user.role === "admin" ? <Menu.Item key="3" icon={<UploadOutlined />}>
                        <Link to='/blogpage'><i className="fa fa-paste" style={{ marginRight: "15px" }} />{collapsed ? '' : 'Danh sách bài viết'}</Link>
                      </Menu.Item> : ''}
                      {user.role === "admin" ? <Menu.Item key="4" icon={<UploadOutlined />}>
                        <Link to='/newpost'><i className="fa fa-plus" style={{ marginRight: "15px" }} />{collapsed ? '' : 'Bài viết mới'}</Link>
                      </Menu.Item> : ''}
                      {user.role === "admin" ? <Menu.Item key="5" >
                        <Link to='/register' ><i className="fa fa-user" style={{ marginRight: "15px" }} />{collapsed ? '' : 'Tài khoản mới'}</Link>
                      </Menu.Item> : ''}
                      {/* <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                      </SubMenu> */}
                    </Menu>
                  </Sider>
                  <Layout className="site-layout" style={{ overflowY: "hidden" }}>
                    <Content
                      className="site-layout-background"
                      style={{
                        margin: '10px',
                        minHeight: 280,
                      }}
                    >
                      <Paper elevation={6} className="paper-container">
                        <Switch>
                          <UnPrivateRoute path="/login" component={Login} />
                          
                          <PrivateRoute path="/register" roles={["admin"]} component={Register} />
                          <Route exact path="/blog/post/detail/:postId/:index" component={NextPre} />
                          <Route exact path="/blog1/post/detail/:postId/:index" component={NextPreBtgv} />
                          <Route exact path="/allpostbantinchung" component={AppPanigation} />
                          <Route exact path="/allpostbantingiaovu" component={AppPanigationBtgv} />
                          <Route exact path="/gioithieubomon" component={GioiThieuBoMon} />
                          <Route exact path="/gioithieunhansu" component={GioiThieuNhanSu} />
                          <Route exact path="/daotao" component={DaoTao} />
                          <Route exact path="/dgyk" component={Dgyk} />
                          <Route exact path="/" component={Body} />
                          {/* ============================================= */}
                          <PrivateRoute exact path="/blogpage" roles={["admin"]} component={BlogPage} />
                          <PrivateRoute exact path="/listfile/:week/:id" roles={["admin"]} component={ListFileOfExercise} />
                          <PrivateRoute exact path="/result" roles={["user"]} component={Result} />
                          <PrivateRoute exact path="/search/:search" roles={["admin"]} component={TestSearchParam} />
                          <PrivateRoute exact path="/blog/post/detail/:postId" roles={["admin"]} component={PostPage} />
                          <PrivateRoute exact path="/blog1/post/detail/:postId" roles={["admin"]} component={PostPageBtgv} />
                          <PrivateRoute path="/newpost" roles={["admin"]} component={CreatePage} />
                          {/* <PrivateRoute path="/postBtgv" roles={["admin"]} component={CreatePage1} />
                  <PrivateRoute path="/postBtcn" roles={["admin"]} component={CreatePage2} /> */}
                          <PrivateRoute path="/blog/post/update/:postId" roles={["admin"]} component={UpdatePost} />
                          <PrivateRoute path="/blog1/post/update/:postId" roles={["admin"]} component={UpdatePostBtgv} />
                          <PrivateRoute path="/changePass" roles={["user", "admin"]} component={ChangePass} />
                          <PrivateRoute path="/admin" roles={["user", "admin"]} component={UploadFile} />
                          <PrivateRoute path="/file/image/detail/:filename" roles={["user", "admin"]} component={ImageItem} />
                          <PrivateRoute path="/createSubject" roles={["user", "admin"]} component={CreateSubject} />
                          <PrivateRoute path="/listSubject" roles={["user", "admin"]} component={ListSubject} />
                          <PrivateRoute path="/createExercise/:id" roles={["user", "admin"]} component={CreateExercise} />
                          <PrivateRoute path="/listExercise/:id" roles={["user", "admin"]} component={ListExercise} />
                          <PrivateRoute path="/exercise/:id/:week/:exerciseName/:deadline/:name" roles={["user", "admin"]} component={UploadFile} />
                          <PrivateRoute path="/test/:id/:week/:exerciseName/:deadline/:name" roles={["user", "admin"]} component={SubjectDetail} />
                          
                          {/* <PrivateRoute path="/sidebar" roles={["user", "admin"]} component={Sidebar} /> */}

                        </Switch>
                      </Paper>
                    </Content>
                  </Layout>
                </Layout>
              </Wrapper>
            </Grid>
          </Grid>
          <Footer />
        </WrapperAuthen>
      }
    </Router>
  );
}

export default App;

const Wrapper = styled.div`

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
`
const WrapperNotAuthen = styled.div`
.grid-container{
  margin-top:75px;
  padding: 20px;
}
.grid-xs9{
  width:100%;
}
.paper-container{
  border-radius:10px;
}
.grid-xs3{
  width:100%;
}

.footer{
  text-align:center;
}
@media only screen and (min-width: 992px){
  .footer{
    text-align:left;
  }
}
@media only screen and (min-width: 1030px){
  .grid-xs9{
    width:70%;
    padding-right:10px;
  }
  .paper-container{
    border-radius:10px;
  }
  .grid-xs3{
    width:30%;
  }
}

@media only screen and (min-width: 1130px){
  .grid-xs9{
    width:80%;
    padding-right:10px;
  }
  .paper-container{
    border-radius:10px;
  }
  .grid-xs3{
    width:20%;
  }
}
`

const WrapperAuthen = styled.div`
.grid-xs12{
  width:100%;
  padding:40px 20px 0;
  margin-top:60px;
}
@media only screen and (min-width: 992px){
.footer{
  text-align:left;
}
}
`