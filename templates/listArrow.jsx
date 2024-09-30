import device from 'core/js/device';
import React from 'react';
import a11y from 'core/js/a11y';
import { templates, classes, compile } from 'core/js/reactHelpers';

export default function listArrow({ _columns, _items, ...props }) {
  const hasColumns = _columns > 1;
  const {
    _id,
    _ariaLevel,
    bodyAfter
  } = props;
  const itemAriaLevel = _.isNumber(_ariaLevel) && _ariaLevel !== 0 ? _ariaLevel + 1 : _ariaLevel;
  return (
    <div className="component__inner listArrow__inner">
      <templates.header {...props} />
      <div className="component__widget listArrow__widget">
        <div
          className={classes([
            'listArrow__container',
            hasColumns && 'has-columns'
          ])}
          role="listArrow"
        >
          {_items.map(({ _isActive, title, body, _classes, _graphic }, index) =>
            <div
              key={index}
              className={classes([
                'listArrow-item',
                _isActive && 'is-animating',
                _graphic?.src && 'has-image',
                title && 'has-title',
                body && 'has-body',
                _classes
              ])}
              role="listArrowitem"
              style={(hasColumns && device.isScreenSizeMin('medium') && { width: `${100 / _columns}%` }) || null}
            >
              <div className="listArrow-item__inner">
                {!_graphic?.src &&
                  <div className="listArrow-item__bullet" aria-hidden="true" />
                }
                {_graphic?.src &&
                  <templates.image {..._graphic}
                    classNamePrefixes={['component-item', 'listArrow-item']}
                    attributionClassNamePrefixes={['component', 'listArrow']}
                  />
                }

                <div className="listArrow-item__content">
                  {title &&
                    <div
                      className="listArrow-item__title"
                      role="heading"
                      aria-level={a11y.ariaLevel({ id: _id, level: 'componentItem', override: _ariaLevel ?? itemAriaLevel })}
                    >
                      <div className="listArrow-item__title-inner" dangerouslySetInnerHTML={{ __html: compile(title, props) }} />
                    </div>
                  }

                  {body &&
                    <div className="listArrow-item__body">
                      <div className="listArrow-item__body-inner" dangerouslySetInnerHTML={{ __html: compile(body, props) }} />
                    </div>
                  }
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
      {bodyAfter &&
        <div className="component__body-after listArrow__body-after">
          <div className="component__body-after-inner listArrow__body-after-inner" dangerouslySetInnerHTML={{ __html: compile(bodyAfter, props) }} />
        </div>
      }
    </div>
  );
}
