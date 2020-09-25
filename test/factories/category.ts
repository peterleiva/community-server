import { Factory } from 'rosie';
import { name, internet } from 'faker';

export default Factory.define('category')
  .attr('name', () => name.findName())
  .attr('backgroundColor', internet.color());
