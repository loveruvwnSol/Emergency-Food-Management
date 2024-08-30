import { Image } from '@chakra-ui/react';
import LogoIcon from '../../../images/icon-text.png';

type LogoProps = {
    size : string
}

const Logo : React.FC<LogoProps> =({ size }) => (
    <Image
        src={LogoIcon}
        alt="備えの食卓"
        boxSize={size}
    />
);

export default Logo;