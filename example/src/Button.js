import {Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Button = ({title, onPress, back, type}) => {
  const navigation = useNavigation();
  const styles = getStyles(type);

  if (back) {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Go back</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
        style={styles.button}
        onPress={onPress}
    >
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
};

export default Button;

const getStyles = (type) => StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    borderRadius: 13,
    backgroundColor: type === 'other' ? '#007AFF' :'darkred',
    textColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 99,
  },
  backText: {
    color: '#007AFF'
  },
});
