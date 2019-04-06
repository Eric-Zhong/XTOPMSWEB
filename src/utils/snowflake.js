import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';

export function snowflakeId() {
  var flakeId = new FlakeId();
  return intformat(flakeId.next(), 'dec');
}
