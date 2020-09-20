import { Factory } from 'rosie';
import { name, internet } from 'faker';

export default Factory.define('category').attrs({
  name: name.findName(),
  backgroundColor: internet.color(),
});
