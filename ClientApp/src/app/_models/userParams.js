var UserParams = /** @class */ (function () {
    function UserParams(user) {
        this.minAge = 18;
        this.maxAge = 99;
        this.pageNumber = 1;
        this.pageSize = 5;
        this.orderBy = 'lastActive';
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
    return UserParams;
}());
export { UserParams };
//# sourceMappingURL=userParams.js.map