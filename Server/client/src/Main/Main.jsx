import React, { Component } from 'react';
//import { Register, SignIn, CnvOverview, CnvDetail, ConfDialog } from '../index'
import { Route, Redirect, Switch } from 'react-router-dom';
import { Alert, Modal, Button, Navbar, Nav, NavItem} from 'react-bootstrap';
//import { LinkContainer } from 'react-router-bootstrap';
import './Main.css';


class Main extends Component {

   /*close = (result) => {
      this.props.updateErrs();
   }

   signedIn() {
      return Object.keys(this.props.Prss).length !== 0; // Nonempty Prss obj
   }
*/
   // Function component to generate a Route tag with a render method
   // conditional on login.  Params {conditional: Cmp to render if signed in}

   render() {
      console.log("Redrawing main");
      return (
         <div>
            <div>
               <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="#home">Compare</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                     <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                     </Nav>
                  </Navbar.Collapse>
                  {/*<Navbar.Toggle />
                  {this.signedIn() ?
                     <Navbar.Text key={1}>
                        {`Logged in as: ${this.props.Prss.firstName}
                         ${this.props.Prss.lastName}`}
                     </Navbar.Text>
                     :
                     ''
                  }
                  <Navbar.Collapse>
                     <Nav>
                        {this.signedIn() ?
                           [
                              <LinkContainer key={"all"} to="/allCnvs">
                                 <NavItem>All Conversations</NavItem>
                              </LinkContainer>,
                              <LinkContainer key={"my"} to="/myCnvs">
                                 <NavItem>My Conversations</NavItem>
                              </LinkContainer>
                           ]
                           :
                           [
                              <LinkContainer key={0} to="/signin">
                                 <NavItem>Sign In</NavItem>
                              </LinkContainer>,
                              <LinkContainer key={1} to="/register">
                                 <NavItem>
                                    Register
                               </NavItem>
                              </LinkContainer>,
                           ]
                        }
                     </Nav>
                     {this.signedIn() ?
                        <Nav pullRight>
                           <LinkContainer key={0} to="/signin">
                              <NavItem eventKey={1}
                               onClick={() => this.props.signOut()}>
                                 Sign out
                              </NavItem>
                           </LinkContainer>
                        </Nav>
                        :
                        ''
                     }
                  </Navbar.Collapse>*/}
               </Navbar>
            </div>

            {/*Alternate pages beneath navbar, based on current route*/}
            {/*<Switch>
               <Route exact path='/'
                  component={() => this.props.Prss ?
                     <Redirect to="/allCnvs" /> : <Redirect to="/signin" />}/>
               <Route path='/signin' render={() => <SignIn {...this.props} />}/>
               <Route path='/register'
                render={() => <Register {...this.props} />} />
               <ProtectedRoute path='/allCnvs' component={CnvOverview}
                {...this.props}/>
               <ProtectedRoute path='/myCnvs' component={CnvOverview}
                userOnly="true" {...this.props}/>}
               <ProtectedRoute path='/CnvDetail' component={CnvDetail}
               {...this.props}/>}
               />

            </Switch>*/}

            {/*Error popup dialog*/}
            {/*<Modal show={this.props.Errs.length > 0} onHide={this.close}>
               <Modal.Header closeButton>
                  <Modal.Title>Error Notice</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Alert bsStyle="danger">{this.props.Errs[0]}</Alert>
               </Modal.Body>
               <Modal.Footer>
                  <Button onClick={this.close}>OK</Button>
               </Modal.Footer>
            </Modal>*/}
         </div>
      )
   }
}

export default Main
