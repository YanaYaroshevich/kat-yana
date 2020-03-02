// The modules should located under 'server/api/api_data'.
/**
 * Configuration data of the DB modules.
 * The configuration contains array of db modules configuration, please see example below:
 * db_modules: [
 *  db_module1: {},
 *  db_module2: {}
 *  ...
 *  db_moduleN: {}
 * ]
 *
 * All the DB modules should be located under the root folder: <b>'servers/api'</b>.
 * Also, the DB modules can be grouped by the locations. Base location folder should be set by @location param.
 * Path to the module inside of the base location folder - should be set by @path param.
 * Type of DB connection should be set by @type param
 * Each db module configuration has this structure:
 * Access permissions by users' roles should be set by @scope param.
 * db_module: {
 * @location: base location folder the module under the root folder.
 * @path:  path to the DB module inside of the base location folder.
 * @type: type of a DB connection (ODBC, JDBC...).
 * @scope: end-users access scope. the param is an array with user's roles.
 * }
 */
module.exports = {
    db_modules: [
      
    ]
};
