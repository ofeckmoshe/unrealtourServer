class DataBuilder {
    constructor(page, size) {
        this.query = 'SELECT ap.* ,ap.id,c.name `city_name`,countries.`name` country,group_concat(images.url) images,concat(u.first_name,u.last_name) onwer,u.email\
                            FROM apartments ap join cities c ON ap.city_id = c.id\
                            JOIN countries  ON c.country_id = countries.id \
                            left JOIN images ON ap.id = images.apartment_id\
                            JOIN users u ON ap.user_id = u.id\
                            WHERE 1 ';
        this.params = [];
        this.page = page;
        this.size = size;
    }
    apartmentId(aparId) {
        if (aparId) {
            this.params.push(aparId)
            this.query += 'AND ap.id = ? '
        }
        return this;
    }
    property_type(property) {
        if (property) {
            this.params.push(property)
            this.query += 'AND property_type = ? '
        }
        return this;
    }
    city(city_name) {
        if (city_name) {
            this.params.push(city_name)
            this.query += 'AND c.name = ? '
        }
        return this;
    }
    country(coutry_name) {
        if (coutry_name) {
            this.params.push('%' + coutry_name + '%')
            this.query += 'AND countries.`name` like ? '
        }
        return this;
    }
    minPrice(minimumPrice) {
        if (minimumPrice) {
            this.params.push(minimumPrice)
            this.query += 'AND ap.price > ? '
        }
        return this;
    }
    maxPrice(maximumPrice) {
        if (maximumPrice) {
            this.params.push(maximumPrice)
            this.query += 'AND ap.price < ? '
        }
        return this;
    }
    minRooms(minimumRoom) {
        if (minimumRoom) {
            this.params.push(minimumRoom)
            this.query += 'AND number_of_room >= ? '
        }
        return this;
    }
    maxRooms(maximumRoom) {
        if (maximumRoom) {
            this.params.push(maximumRoom)
            this.query += 'AND number_of_room < ? '
        }
        return this;
    }
    minBath(minimumBath) {
        if (minimumBath) {
            this.params.push(minimumBath)
            this.query += 'AND number_of_bath >= ? '
        }
        return this;
    }
    maxBath(maximumBath) {
        if (maximumBath) {
            this.params.push(maximumBath)
            this.query += 'AND number_of_bath < ? '
        }
        return this;
    }
    sale_status(sale_status) {
        if (sale_status) {
            this.params.push(sale_status)
            this.query += 'AND sale_status = ? '
        }
        return this;
    }
    user_id(user_id) {
        if (user_id) {
            this.params.push(user_id)
            this.query += 'AND user_id = ? '
        }
        return this;
    }
    build() {
        this.query += `GROUP BY ap.id\
                       LIMIT ${(this.page-1)*this.size}, ${this.size};
                       select count(*) as size from realtor.apartments;`
        console.log('build',this.query, this.params);
        return { query: this.query, params: this.params };
    }

}
class Builder {
    static allApartments(page, size) {
        return new DataBuilder(page, size);
    }
}


module.exports = Builder;