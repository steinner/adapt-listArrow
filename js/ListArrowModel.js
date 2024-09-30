import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class ListArrowModel extends ItemsComponentModel {

  defaults() {
    return ItemsComponentModel.resultExtend('defaults', {
      _animatelistArrow: false,
      _columns: 0,
      _percentInviewVertical: 70
    });
  }

}
