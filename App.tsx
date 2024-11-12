import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type CalcButtonProps = {
  label: string;
  onPress: () => void;
  isDarkMode: boolean;
  style?: object;
  backgroundColor?: string;
  textColor?: string;
};

export default function App() {
  const [display, setDisplay] = useState<any>('');
  const [result, setResult] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCalculated,setIsCalculated] = useState(false);

  const handlePress = (value: string) => {
    if (isCalculated) {
      if (value === '*' || value === '/' || value === '+' || value === '-') {
        setDisplay(result + value); 
        setIsCalculated(false);  
      } else {
        setDisplay(value); 
      }
    } else {
      if (
        (value === '*' || value === '/') &&
        (display.endsWith('*') || display.endsWith('/'))
      ) {
        return;
      }
      setDisplay(display + value);
    }
  };
  
  const calculateResult = () => {
    const calculatedResult = caculate(display);
    console.log('result', calculatedResult);
    setResult(calculatedResult);
    setDisplay(calculatedResult.toString());  
    setIsCalculated(true);  
  };

  const caculate = (n: any) => {
    const regex = n.match(/(\d+\.?\d*|\+|\-|\*|\/|\%)/g);
    console.log(regex);

    if (!regex) return 0;

    let stack = [];
    let currentNumber = parseFloat(regex[0]);
    console.log(currentNumber);

    for (let i = 1; i < regex.length; i += 2) {
      const operator = regex[i];
      let nextNumber = parseFloat(regex[i + 1]);
      console.log(nextNumber);
      if (operator === '%') {
        currentNumber = currentNumber / 100;
      } else if (operator === '*') {
        currentNumber *= nextNumber;
      } else if (operator === '/') {
        currentNumber /= nextNumber;
      } else {
        stack.push(currentNumber);
        stack.push(operator);
        console.log('op', operator);
        currentNumber = nextNumber;
      }
    }
    stack.push(currentNumber);

    console.log(stack);
    let result = stack[0];
    for (let i = 1; i < stack.length; i += 2) {
      const operator = stack[i];
      let nextNumber = stack[i + 1];
      if (operator === '+') {
        result += nextNumber;
      } else if (operator === '-') {
        result -= nextNumber;
      }
    }
    return result;
  };
  const deleteNumber = () =>{
    setDisplay(display.slice(0, -1))
  }
  const clearDisplay = () => {
    setDisplay('');
    setResult(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <LinearGradient
      colors={['#f99702', '#492f08']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      <Text style={[styles.resultText, isDarkMode && styles.resultTextDark]}>
        {/* {result !== null ? result : display || '0'} */}
        {display}
      </Text>

      <View
        style={[
          styles.buttonContainer,
          isDarkMode && styles.buttonContainerLight,
        ]}>
        <View style={styles.row}>
          <CalcButton
            label="AC"
            onPress={clearDisplay}
            isDarkMode={isDarkMode}
            backgroundColor="#A5A5A5"
            textColor="#000"
          />
          <CalcButton
            label="⌫"
            onPress={deleteNumber}
            isDarkMode={isDarkMode}
            backgroundColor="#A5A5A5"
            textColor="#000"
          />
          <CalcButton
            label="%"
            onPress={() => handlePress('%')}
            isDarkMode={isDarkMode}
            backgroundColor="#A5A5A5"
            textColor="#000"
          />
          <CalcButton
            label="/"
            onPress={() => handlePress('/')}
            isDarkMode={isDarkMode}
            backgroundColor="#ff9f0A"
          />
        </View>
        <View style={styles.row}>
          <CalcButton
            label="7"
            onPress={() => handlePress('7')}
            isDarkMode={isDarkMode}
          />
          <CalcButton
            label="8"
            onPress={() => handlePress('8')}
            isDarkMode={isDarkMode}
          />
          <CalcButton
            label="9"
            onPress={() => handlePress('9')}
            isDarkMode={isDarkMode}
          />
          <CalcButton
            label="×"
            onPress={() => handlePress('*')}
            isDarkMode={isDarkMode}
            backgroundColor="#ff9f0A"
          />
        </View>
        <View style={styles.row}>
          <CalcButton
            label="4"
            onPress={() => handlePress('4')}
            isDarkMode={isDarkMode}
          />
          <CalcButton
            label="5"
            onPress={() => handlePress('5')}
            isDarkMode={isDarkMode}
          />
          <CalcButton
            label="6"
            onPress={() => handlePress('6')}
            isDarkMode={isDarkMode}
          />
          <CalcButton
            label="-"
            onPress={() => handlePress('-')}
            isDarkMode={isDarkMode}
            backgroundColor="#ff9f0A"
          />
        </View>
        <View style={styles.row}>
          <CalcButton
            label="1"
            onPress={() => handlePress('1')}
            isDarkMode={isDarkMode}
          />
          <CalcButton
            label="2"
            onPress={() => handlePress('2')}
            isDarkMode={isDarkMode}
          />
          <CalcButton
            label="3"
            onPress={() => handlePress('3')}
            isDarkMode={isDarkMode}
          />
          <CalcButton
            label="+"
            onPress={() => handlePress('+')}
            isDarkMode={isDarkMode}
            backgroundColor="#ff9f0A"
          />
        </View>
        <View style={styles.row}>
          <CalcButton
            label="0"
            onPress={() => handlePress('0')}
            isDarkMode={isDarkMode}
            style={{flex: 2}}
          />
          <CalcButton
            label="."
            onPress={() => handlePress('.')}
            isDarkMode={isDarkMode}
            style={{flex: 1}}
          />
          <CalcButton
            label="="
            onPress={() => calculateResult()}
            isDarkMode={isDarkMode}
            style={{flex: 1}}
            backgroundColor="#ff9f0A"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const CalcButton: React.FC<CalcButtonProps> = ({
  label,
  onPress,
  isDarkMode,
  style,
  backgroundColor,
  textColor,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      isDarkMode && styles.buttonDark,
      style,
      {
        backgroundColor:
          backgroundColor || (isDarkMode ? '#f1f1f1' : '#1d1b16'),
      },
    ]}>
    <Text
      style={[
        styles.buttonText,
        {color: textColor || (isDarkMode ? '#000' : '#fff')},
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b47c1b',
    justifyContent: 'flex-end',
  },
  containerDark: {
    backgroundColor: '#f0f0f0',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  previousResultText: {
    fontSize: 20,
    textAlign: 'right',
    marginRight: 20,
    color: '#888',
  },
  previousResultTextDark: {
    color: '#000',
  },
  resultText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'right',
    margin: 20,
    color: '#fff',
  },
  resultTextDark: {
    color: '#000',
  },
  buttonContainer: {
    backgroundColor: '#000',
    // paddingHorizontal: 5,
    // paddingVertical: 15,
  },
  buttonContainerLight: {
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    // margin: 5,
    // marginRight: 5,
  },
  button: {
    flex: 1,
    height: 80,
    width: 80,
    // lineHeight : 60,
    // margin: 8,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 50,
    borderWidth: 1,
  },
  buttonDark: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextDark: {
    color: '#f0f0f0',
  },
});
