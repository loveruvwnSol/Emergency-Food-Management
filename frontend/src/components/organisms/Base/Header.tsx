import { useBreakpointValue } from "@chakra-ui/react";

import DesktopHeader from "../../molecules/Base/DesktopHeader";
import MobileHeader from "../../molecules/Base/MobileHeader";

type HeaderProps ={
  title : string; 
}

const Header:React.FC<HeaderProps> = ({title}) => {
  const isDesktop = useBreakpointValue({ base: false, sm: true });

  return isDesktop ? <DesktopHeader /> : <MobileHeader title={title}/>;
};

export default Header;
