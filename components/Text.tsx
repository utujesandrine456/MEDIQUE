import {Text as RNText, TextProps} from 'react-native';


export default function Text({ style, ...props} : TextProps) {
    return <RNText style={[{ fontFamily: 'Poppins_400Regular'}, style]} {...props} />;
};

