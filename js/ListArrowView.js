import ComponentView from 'core/js/views/componentView';
import { transitionsEnded } from 'core/js/transitions';

class ListArrowView extends ComponentView {

  className() {
    let classes = super.className();
    if (this.isAnimatedlistArrow) {
      classes += ' is-animated-listArrow';
      if (!this._hasAnimated) classes += ' is-animating';
    }
    return classes;
  }

  postRender() {
    this.setReadyStatus();
    this.setupInviewCompletion('.component__widget');
    this.contentAlignment();

    if (this.isAnimatedlistArrow) {
      this.$('.listArrow__container').on('onscreen.animate', this.checkIfOnScreen.bind(this));
    }
  }

  contentAlignment() {
    const _horizontalAlignment = this.model.get('_itemHorizontalAlignment');
    const _bulletAlignment = this.model.get('_bulletAlignment');

    if (_horizontalAlignment) this.$el.addClass(`item-justify-${_horizontalAlignment}`);
    if (_bulletAlignment) this.$el.addClass(`bullet-align-${_bulletAlignment}`);
  }

  /**
   * Kicks off the listArrow item animation once the listArrow container is at least xx% on screen
   */
  checkIfOnScreen({ currentTarget }, options) {
    const { onscreen, percentInviewVertical } = options;
    if (!onscreen || percentInviewVertical < this.model.get('_percentInviewVertical')) return;

    $(currentTarget).off('onscreen.animate');
    this.animatelistArrowItems();
  }

  /**
   * animates the listArrow items in one-by-one
   */
  animatelistArrowItems() {
    const items = this.model.getChildren();
    const itemCount = items.length;
    items.forEach((listArrowItem, index) => {
      setTimeout(async () => {
        listArrowItem.toggleActive(true);
        if (index !== (itemCount - 1)) return;
        const $item = this.$('.listArrow-item').eq(index);
        await transitionsEnded($item);
        this._hasAnimated = true;
        this.$el.removeClass('is-animating');
      }, 200 * index);
    });
  }

  remove() {
    this.$('.listArrow__container').off('onscreen.animate');

    super.remove();
  }

  get isAnimatedlistArrow() {
    // don't animate when Visua11y 'no animations' is set
    return this.model.get('_animatelistArrow') && (!$('html').hasClass('a11y-no-animations'));
  }
};

ListArrowView.template = 'listArrow.jsx';

export default ListArrowView;
