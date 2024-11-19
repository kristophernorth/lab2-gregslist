import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";


export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHouseById)
  }

  async getHouses(request, response, next) {
    try {
      const houses = await housesService.getHouses
      response.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouseById(request, response, next) {
    try {
      const houseID = request.params.houseId
      const house = await housesService.getHouseById(houseID)
      response.send(house)
    } catch (error) {
      next(error)
    }
  }
}