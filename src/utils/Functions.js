import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Retorna o IP do device
 */
export async function IpAddress() {
  const response = await NetInfo.fetch();
  return response.details.ipAddress;
}

/**
 * Retorna o usuário da sessão
 * do device
 */
export async function UserLogged() {
  const user = await AsyncStorage.getItem('@Medipreco:userLogged');
  return JSON.parse(user);
}

/**
 * Function to format money
 * @param {*} value
 */
export function FormatMoney(value) {
  Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
    places = !isNaN((places = Math.abs(places))) ? places : 2;
    symbol = symbol !== undefined ? symbol : '$';
    thousand = thousand || ',';
    decimal = decimal || '.';
    var number = this,
      negative = number < 0 ? '-' : '',
      i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      symbol +
      negative +
      (j ? i.substr(0, j) + thousand : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
      (places
        ? decimal +
          Math.abs(number - i)
            .toFixed(places)
            .slice(2)
        : '')
    );
  };
  return JSON.parse(value).formatMoney(2, 'R$ ', '.', ',');
}
