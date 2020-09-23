import { Types } from 'mongoose';
import { Factory } from 'rosie';
import { internet, name, address } from 'faker';

export default Factory.define('user')
  .sequence('_id', () => new Types.ObjectId())
  .attr('name', name.findName())
  .attr('email', internet.email())
  .attr('location', {
    type: 'Point',
    coordinates: [address.latitude(), address.longitude()],
  });
