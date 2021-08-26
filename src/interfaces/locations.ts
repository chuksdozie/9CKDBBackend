import TableCommons from './interfaceCommons';

export default interface locationsTable extends TableCommons {
  location_id: string;
  location_name: string;
  location_address: string;
  location_city: string;
}