
const sequelize= require('../../../database/mysql').sequelize;

exports.findById = (model, id) => {
    return model.findById(id);
};
exports.findOne = (model, whereClause, select) => {
	return model.findOne({
        where: whereClause,
        attributes: select
	});
};

exports.findAll = (model, whereClause, select, sort) => {
	return model.findAll({
		attributes: select,
		where : whereClause,
		order: sort
	});
};

exports.update = (model, whereClause,updateFields) => {
	return model.update(
     updateFields,
     { where: whereClause });
};

exports.create=(model, body) => {
	return model.create(body);
};
exports.paginate = (model, whereClause, projectFields, orderBy, queryParams) => {
	return model.findAndCountAll({
		attributes: projectFields,
		where: whereClause?whereClause:{},
		offset: parseInt(queryParams.numResults * (queryParams.pageNumber - 1), 10),
		limit: parseInt(queryParams.numResults, 10),
		order: orderBy
	});
}


exports.delete = (model, query) => {
	return model.destroy(query);
};

exports.count = (model, query) => {
	return model.count(query);
};

exports.bulkCreate = (model, data) => {
	return model.bulkCreate(data);
};

exports.rawQuery = (query, options) => {
	return sequelize.query(query, options);
};


exports.includeData = (model, whereClause, projectFields, include, orderBy) => {
	var data = {
		where:whereClause,
		attributes:projectFields,
		include: include
	};
	if(orderBy) {
		data.order = orderBy;
	}
	return model.findOne(data);
};

exports.includeDatawithSorting = (model, whereClause, projectFields, include, orderBy) => {
	return model.findOne({
		where:whereClause,
		attributes:projectFields,
		include: include,
		order:orderBy
	});
};
exports.includeAllData = (model, whereClause, projectFields, include, orderBy) => {
	return model.findAll({
		where:whereClause,
		attributes:projectFields,
		include: include,
		order: orderBy
	});
};

exports.includeAllDataWithPaginate = (model, whereClause, projectFields, include, queryParams, orderBy) => {
	return model.findAndCountAll({
		where:whereClause,
		attributes:projectFields,
		include: include,
		offset: parseInt(queryParams.numResults * (queryParams.pageNumber - 1), 10),
		limit: parseInt(queryParams.numResults, 10),
		order: orderBy
	});
};