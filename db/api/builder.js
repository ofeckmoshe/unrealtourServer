class Builder {
    constructor(){
        this.query = '';
        this.limit = '';
        this.params = [];
    }
    allUsers = (page, size) =>{
        this.query = "SELECT * from USERS WHERE 1"; 
        this.limit = ` limit ${(page-1)*size}, ${size}`;
        return this;
    }
    allApartments = (page, size) =>{
        this.query = "SELECT apartments.*, cities.name AS city from apartments join cities on apartments.city_id = cities.id  WHERE 1"; 
        this.limit = ` limit ${(page-1)*size}, ${size}`;
        return this;
    }
    id = (id) => {
        if(id){
            this.query += `(${!id ? '1': (this.params.push(id), 'id = ? ')}) and `;
        }
            return this;
    }
    sale_status =(sale_status) => {
        if(sale_status){
            this.query += `${!sale_status ? '1': (this.params.push(sale_status), ' and sale_status = ? ')} `;
        }
        return this;
    }
    user_id = (user_id) => {
        if(user_id){
            this.query += `(${!user_id ? '1': (this.params.push(user_id), 'user_id = ? ')}) and `;
        }
        return this;
    }
    city = (city) => {
        if(city){
            this.query += `(${!city ? '1': (this.params.push(city), 'city = ? ')})  `;
        }
        return this;
    }
    max_price = (price) => {
        if(price){
            this.query += `${!price ? '1': (this.params.push(price), ' and price <= ? ')} `;
        }
        return this;
    }
    min_price = (price) => {
        if(price){
            this.query += `${!price ? '1': (this.params.push(price), ' and price >= ? ')} `;
        }
        return this;
    }
    number_of_room = (number_of_room) => {
        if(number_of_room){
            this.query += `(${!number_of_room ? '1': (this.params.push(number_of_room), 'number_of_room > ? ')})  `;
        }
        return this;
    }
    number_of_bath = (number_of_bath) => {
        if(number_of_bath){
            this.query += `(${!number_of_bath ? '1': (this.params.push(number_of_bath), 'number_of_bath > ? ')}) `;
        }
        return this;
    }
    build = ()=>{
        this.query += this.limit;
        return {query: this.query, params: this.params}
    }
}



module.exports = Builder;