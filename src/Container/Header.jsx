/*eslint-disable react-hooks/exhaustive-deps*/
import * as MAP from "react-bootstrap";
import { FiHome } from "react-icons/fi";
import { FcElectricity } from "react-icons/fc";



const Header = () => {
 
  return (
    <MAP.Container fluid>
      <MAP.Row>
        <MAP.Navbar collapseOnSelect expand="lg" fixed="top" className="MAP-Top-Nav" style={{ posistion: "fixed", top: "0px" }} >
          <MAP.Navbar.Toggle aria-controls="responsive-navbar-nav" />
         
         <h3><FcElectricity />  Employee Details </h3>

            <MAP.Navbar.Collapse id="responsive-navbar-nav">
              <MAP.Nav className="me-auto"></MAP.Nav>
              <MAP.Nav>
              
                <MAP.Nav.Link className="icon-size-header " ><FiHome /></MAP.Nav.Link>
              </MAP.Nav>
            </MAP.Navbar.Collapse>
             <MAP.Nav className="me-auto">
            <MAP.Nav.Link href="#home">Home</MAP.Nav.Link>
            <MAP.Nav.Link href="#link">Link</MAP.Nav.Link>
            <MAP.NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <MAP.NavDropdown.Item href="#action/3.1">Action</MAP.NavDropdown.Item>
              <MAP.NavDropdown.Item href="#action/3.2">
                Another action
              </MAP.NavDropdown.Item>
              <MAP.NavDropdown.Item href="#action/3.3">Something</MAP.NavDropdown.Item>
              <MAP.NavDropdown.Divider/>
              <MAP.NavDropdown.Item href="#action/3.4">
                Separated link
              </MAP.NavDropdown.Item>
            </MAP.NavDropdown>
          </MAP.Nav>
          
        </MAP.Navbar>
      </MAP.Row>
    </MAP.Container>
  );
}
export default Header;
