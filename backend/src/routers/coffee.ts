import express from "express"
import * as controller from "../controllers/coffee" ;
const router = express.Router();

router.get('/', controller.getAllCoffee)
router.get('/:id', controller.getOneCoffee)
router.post('/', controller.addCoffee)
router.patch('/:id', controller.updateCoffee)
router.post('/:id', controller.updateCoffee)
router.delete('/:id', controller.deleteCoffee)

export default router;