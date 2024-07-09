"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHolidaysDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_holidays_dto_1 = require("./create-holidays.dto");
class UpdateHolidaysDto extends (0, mapped_types_1.PartialType)(create_holidays_dto_1.CreateHolidaysDto) {
}
exports.UpdateHolidaysDto = UpdateHolidaysDto;
//# sourceMappingURL=update-holidays.dto.js.map