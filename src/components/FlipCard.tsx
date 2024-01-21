import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import '../styles/FlipCard.css';
import { Button, CardMedia } from '@mui/material';

interface FlipCardProps {
    cardImage: any;
    frontImage: any;
    backImage: any;
    title: string;
    description: string | undefined;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontImage, backImage, title, description, cardImage }) => {
    const [flipped, setFlipped] = useState(false);

    function handleRedirect(title: string): void {
        window.location.href = `/products/${title}`;
    }

    return (
        <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <CardMedia
                        component="img"
                        image={frontImage}
                        alt={title}
                    />
                    <div className="title-overlay">
                        <Typography variant="h5" component="div" sx={{
                            color: 'white',
                            fontSize: '1.5rem',
                            fontFamily: "'Amatic SC'",
                        }}>
                            {title}
                        </Typography>
                    </div>
                </div>
                <div className="flip-card-back">
                    <Card>
                        <Button variant="contained" onClick={() => handleRedirect(title)} fullWidth>
                            View
                        </Button>
                        <CardMedia component={'img'} image={backImage} alt={title} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
