import React, { FC } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Card as MuiCard,
  CardHeader,
  CardContent,
  Typography,
  CardActions as MuiCardActions,
  CardMedia,
  CardActionArea,
} from '@material-ui/core'

export interface CardProps {
  /**
   * An 'Avatar' component. If set, the card header is shown with `title` and `subtitle`.
   */
  avatar?: React.ReactNode
  /**
   * The `CardBody` and `CardActions` components.
   */
  children?: React.ReactNode
  /**
   * If set, the card acts as button that follows this URL.
   */
  href?: string
  /**
   * The 'src' attribute for the image to be displayed above content area.
   */
  image?: string
  /**
   * Text for card's subtitle.
   */
  subtitle?: string
  /**
   * Text for card's title.
   */
  title?: string
}

/**
 * Actions area for card
 * @param children The contents of the component
 */
export const CardActions: FC = ({ children }) => (
  <MuiCardActions>{children}</MuiCardActions>
)

/**
 * Main body of the card
 * @param children The contents of the component
 * @param className The CSS class to pass to component
 */
export const CardBody: FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <Typography className={className} component="div" variant="body2">
    {children}
  </Typography>
)

/**
 * Inject styles for Card
 * @param theme The theme in use
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiCardActions-root': {
        padding: '8px 16px',
      },
    },
    header: {
      padding: 24,
    },
    content: {
      padding: 24,
    },
    title: {
      textTransform: 'uppercase',
      marginBottom: 20,
      fontSize: '.875rem',
      fontWeight: 700,
    },
    subtitle: {
      color: theme.palette.grey[600],
      marginBottom: 16,
      fontSize: '.875rem',
    },
  })
)

/**
 * Cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and
 * actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates
 * hierarchy.
 *
 * A `Card` may contain two optional components:
 *
 * - A `CardBody` component which contains wrapped content
 * - A `CardActions` component with elements for action, like buttons or icons
 */
export const Card: FC<CardProps> = ({
  avatar,
  children,
  href,
  image,
  subtitle,
  title,
}) => {
  const classes = useStyles()

  /**
   * Avatar component
   */
  const header = avatar && (
    <CardHeader
      avatar={avatar}
      className={classes.header}
      title={title}
      subheader={subtitle}
    />
  )
  /**
   * CardBody component if set
   */
  const body = React.Children.toArray(children)?.find(
    ({ type }: any) => type === CardBody
  )
  /**
   * CardActions component if set
   */
  const actions = React.Children.toArray(children)?.find(
    ({ type }: any) => type === CardActions
  )
  /**
   * Image part of the card
   */
  const media = image && (
    <CardMedia component="img" image={image} title={title} />
  )

  /**
   * Card's main content. Includes title, subtitle and the contents of CardBody
   */
  const content = (
    <>
      {media}
      <CardContent className={classes.content}>
        {!avatar && (
          <>
            {title && <div className={classes.title}>{title}</div>}
            {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
          </>
        )}
        {body}
      </CardContent>
    </>
  )

  return (
    <MuiCard className={classes.root}>
      {header}
      {href ? <CardActionArea href={href}>{content}</CardActionArea> : content}
      {actions}
    </MuiCard>
  )
}
