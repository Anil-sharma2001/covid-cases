import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core"

function InfoBox({title,cases,total}) {
  return (
    <div>
        <Card className='infoBox'>
            <CardContent>
                {/* title */}
                <Typography className='infoBox_title' colour="textSecondary">
                  {title}
                </Typography>
                {/* cornoa case */}
                <h2 className='infoBox_cases'>{cases}</h2>
                {/* total cases */}
                <Typography className='infoBox_total' color="textSecondary">
                    {total} cases
                </Typography>
            </CardContent>
        </Card>

    </div>
    
  )
}

export default InfoBox;